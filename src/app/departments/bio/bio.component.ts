import {Component, OnDestroy, OnInit, QueryList, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HeaderService} from "../../header/header.service";
import {BioService} from "./bio.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatStep} from "@angular/material/stepper";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StudentService} from "../../student/student.service";
import {AsyncSubject, BehaviorSubject, combineLatest, Observable, Subject, Subscription} from "rxjs";
import {debounceTime, map, shareReplay, startWith, tap} from "rxjs/operators";
import * as equal from "fast-deep-equal"
import {ActivatedRoute} from "@angular/router";
import {CommentService} from "../../shared/comment/comment.service";
import {CommentThread} from "../../shared/comment/comment-thread.model";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {BioDoc} from "./biodoc.model";
import {SelectionModel} from "@angular/cdk/collections";
import {employedHereValidator, InternshipInfoDirective, otherSiteValidator} from "./internship-info.directive";
import {AppProgressType} from "../../shared/models/AppProgressType";

// TODO save bio form fields into store and load only if it's the same user.
export const bioStore = new BehaviorSubject({});

export const bioStore$ = bioStore.asObservable();


export function dirtyCheck<U>(source: Observable<U>) {
  return function<T>(valueChanges: Observable<T>): Observable<boolean> {
    return combineLatest(
      [source, valueChanges]
    ).pipe(
      debounceTime(300),
      map(([a, b]) => equal(a, b)),
      startWith(true),
      shareReplay({bufferSize: 1, refCount: true}),
    );
  };
}

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit, OnDestroy {
  progressType = AppProgressType;
  private studentId?: string;
  /*
  * This is for the instructions form */
  instructions: FormGroup = new FormGroup({
    body: new FormControl('')
  })
  instructionsEditable: boolean = false;
  instructionsMode: string = "view"
  instructionsLoading: boolean = false;

  private editorSubject: Subject<any> = new AsyncSubject();
  bioApplication!: FormArray;
  studentAcademicInfo!: FormGroup;
  emergencyContactInfo!: FormGroup;
  mentorInfo!: FormGroup;
  internshipInfo!: FormGroup;
  educationalObjectives!: FormGroup;
  documents!: FormGroup;
  signature!: FormGroup;
  years! : {
    label: string,
    value: string
  }[]
  bioAppSites!: string[];
  bioCommentThreads!: Array<CommentThread>;
  bioCommentsSub!: Subscription;
  // this needs to link up to the data type but also the order in the array here determines the order of the columns in the table. The defs here are what go into matColumnDef in html.
  displayedColumns: string[] = [ 'select', 'filename', 'filetype', 'date uploaded', 'actions'];
  siteIsOther: boolean = false;
  studentIsEmployed = new BehaviorSubject<boolean>(false);
  siteSelected!: string;

  errorMsg: string = "Please check the form for errors, fill in required fields, and resubmit.";
  bioStoreSub!: Subscription;
  isDirty$!: Observable<boolean>;

  // Going to get rid of these
  bioApp!: any;
  essayFileName!: string;
  transcriptFileName!: string;
  otherFileName!: string;
  @ViewChild(MatTable) table!: MatTable<{pos: number, filetype: string, filename: string}>
  dataSource = new MatTableDataSource<BioDoc>([]);
  selection = new SelectionModel<BioDoc>(true, []);

  constructor(private _formBuilder: FormBuilder,
              private bioService: BioService,
              private headerService: HeaderService,
              private _snackBar: MatSnackBar,
              private studentService: StudentService,
              private commentService: CommentService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.headerService.activateRoute('application');
    this.loadInstructions();
    // TODO Gotta move form init into the bio service
    this.bioApplication = this._formBuilder.array([
      this.studentAcademicInfo = this._formBuilder.group({
        desiredInternshipSemester: ['', Validators.required],
        desiredInternshipYear: ['', Validators.required],
        concentration: ['', Validators.required],
        expectedGradSemester: ['', Validators.required],
        expectedGradYear: ['', Validators.required],
        overallGPA: ['', Validators.required],
        programGPA: ['', Validators.required],
        hoursCompleted: ['', Validators.required],
        intendedProfession: ['', Validators.required],
      }),
      this.emergencyContactInfo = this._formBuilder.group({
        contactFirstName: ['', Validators.required],
        contactLastName: ['', Validators.required],
        contactAddress: ['', Validators.required],
        contactCity: ['', Validators.required],
        contactState: ['', Validators.required],
        contactZip: ['', Validators.required],
        contactPhone: ['', Validators.required],
        contactEmail: ['', Validators.required],
      }),
      this.mentorInfo = this._formBuilder.group({
        mentorFirstName: ['', Validators.required],
        mentorLastName: ['', Validators.required],
        mentorOffice: ['', Validators.required],
        mentorPhone: ['', Validators.required],
        mentorEmail: ['', Validators.required],
      }),
      this.internshipInfo = this._formBuilder.group({
        committeeSites: ['', Validators.required],
        siteName: ['', ],
        siteSpecialty: ['', ],
        siteAddress: ['', ],
        siteCity: ['', ],
        siteState: ['', ],
        siteZip: ['', ],
        sitePhone: ['', ],
        managerFirstName: ['', ],
        managerLastName: ['', ],
        managerTitle: ['', ],
        managerEmail: ['', ],
        preceptorFirstName: ['', ],
        preceptorLastName: ['', ],
        preceptorPhone: ['', ],
        preceptorEmail: ['', ],
        preceptorTitle: ['', ],
        preceptorManagerStatus: ['', ],
        studentEmployedHere: ['', Validators.required],
        studentPosition: ['', ],
        studentPayStatus: ['', ],
        studentAvgWorkingHours: ['', ],
        studentInternshipVsWork: ['', ],
        studentPersonalConnection: ['', ],
      }, {validators: [otherSiteValidator, employedHereValidator] }),
      this.educationalObjectives = this._formBuilder.group({
        firstObjective: ['', Validators.required],
        secondObjective: ['', Validators.required],
        thirdObjective: ['', Validators.required],
      }),
      this.documents = this._formBuilder.group({
        essay: this._formBuilder.array([], Validators.required),
        transcript: this._formBuilder.array([], Validators.required),
        otherDoc: this._formBuilder.array([]),
      }),
      this.signature = this._formBuilder.group({
        printedSignature: ['', Validators.required],
      })
    ]);


    this.years = this.bioService.years;
    // TODO this should be retrieved from server if I want coordinator to be able to set what the sites are
    this.bioAppSites = this.bioService.getBioAppSites();
    // TODO this should be replaced by an http call, but it can already be done in the bioStoreSub code below
    // this.bioDocs = this.bioService.getDocs();

    if (this.route.snapshot.paramMap.get('isCoordinator')) {
      this.instructionsEditable = true;
      this.studentId = this.route.snapshot.paramMap.get('studentId') as string;
      this.commentService.setAppId(this.route.snapshot.paramMap.get('studentId'))
    }
    this.bioCommentsSub = this.commentService.getCommentThreadsChanged().subscribe((commentThreads) => {
      this.bioCommentThreads = commentThreads;
    })
    this.commentService.getCommentThreads();

    this.bioStoreSub = this.bioService.getApplication(this.studentId).subscribe(res => {
      this.bioApp = res.application;
      if (this.bioApp) {
        Object.keys(this.bioApp).forEach(key => {
          if (key !== '_id' && key !== 'userId' && key !== '__v' && key !== 'completed') {
            Object.keys(this.bioApp[key]).forEach(value => {
              if (key === 'studentAcademicInfo') {
                this.studentAcademicInfo.get(value)?.patchValue(this.bioApp[key][value]);
              }
              else if (key === 'emergencyContactInfo') {
                this.emergencyContactInfo.get(value)?.patchValue(this.bioApp[key][value]);
              }
              else if (key === 'mentorInfo') {
                this.mentorInfo.get(value)?.patchValue(this.bioApp[key][value]);
              }
              else if (key === 'internshipInfo') {
                this.internshipInfo.get(value)?.patchValue(this.bioApp[key][value]);
                if (value === 'committeeSites') {
                  if (this.bioApp[key]['committeeSites'] === 'other') {
                    this.siteIsOther = true;
                    this.siteSelected = 'other';
                  } else if (this.bioApp[key]['committeeSites'] !== 'other' && this.bioApp[key]['committeeSites'] !== '') {
                    this.siteSelected = this.bioApp[key]['committeeSites'];
                  }
                  if (this.bioApp[key]['studentEmployedHere'] === 'yes') {
                    this.studentIsEmployed.next(true);
                  }
                }
              }
              else if (key === 'educationalObjectives') {
                this.educationalObjectives.get(value)?.patchValue(this.bioApp[key][value]);
              }
              else if (key === 'documents') {
                for (let i = 0; i < this.bioApp[key][value].length; i++) {
                  (this.documents.get(value) as FormArray).insert(i, this._formBuilder.control(this.bioApp[key][value]))
                  this.bioService.addDoc((this.documents.get(value) as FormArray).at(i).value.at(i))
                }
                this.documents.get(value)?.patchValue(this.bioApp[key][value]);
              }
              else if (key === 'signature') {
                this.signature.get(value)?.patchValue(this.bioApp[key][value]);
              }
            })
          }
        });
      }

      // This combines all the formGroups' valueChanges into one object and setting its controls as the default values to start with.
      const bioAppValueChanges = combineLatest([
        this.studentAcademicInfo.valueChanges.pipe(startWith(this.studentAcademicInfo.value)),
        this.emergencyContactInfo.valueChanges.pipe(startWith(this.emergencyContactInfo.value)),
        this.mentorInfo.valueChanges.pipe(startWith(this.mentorInfo.value)),
        this.internshipInfo.valueChanges.pipe(startWith(this.internshipInfo.value)),
        this.educationalObjectives.valueChanges.pipe(startWith(this.educationalObjectives.value)),
        this.signature.valueChanges.pipe(startWith(this.signature.value))
      ])

      // This sets the bioStore to init vals of the formGroups
      bioStore.next([
        {...this.studentAcademicInfo.value},
        {...this.emergencyContactInfo.value},
        {...this.mentorInfo.value},
        {...this.internshipInfo.value},
        {...this.educationalObjectives.value},
        {...this.signature.value},
      ]);

      this.isDirty$ = bioAppValueChanges.pipe(dirtyCheck(bioStore$));

      this.dataSource = new MatTableDataSource<BioDoc>(this.bioDocs.value);
      this.bioDocs.subscribe(() => {
        this.refreshDocsTable();
      })

    });

  }

  onCommitteeSiteChange(selectedSite: Event) {
    this.siteIsOther = String(selectedSite) === 'other';
  }

  onStudentEmploymentChange(isStudentEmployedAtSite: Event) {
    if (String(isStudentEmployedAtSite) === 'yes') {
      this.studentIsEmployed.next(true);
    } else {
      this.studentIsEmployed.next(false);
    }
  }

  onSiteSelected(siteName: Event) {
    this.siteSelected = String(siteName);
  }

  // TODO need to finish this by changing appStatus to "Awaiting Approval" as well as saving any changes
  onSubmit(steps: QueryList<MatStep>) {
    for (let i = 0; i < this.bioApplication.length; i++) {
      if (this.bioApplication.controls[i].invalid) {
        this.bioApplication.controls[i].markAllAsTouched()
        steps.get(i)!.hasError = true;
      } else if (this.bioApplication.controls[i].valid) {
        steps.get(i)!.hasError = false;
      }
    }
    steps.notifyOnChanges()
    if (this.bioApplication.valid) {
      console.log("Application is valid. Submitting application...")
      this.onSaveApplication();
      this.studentService.setAppProgress(this.calcAppProgress());
      this.studentService.setAppStatus(this.progressType.AWAITING_APPROVAL);
    }
  }

  // TODO this won't update whether the documents formControl is valid unlike saveApp. Requires a separate server check and update of the document's completed field in order to update home without a saveApp call.
  onFilePicked(event: Event, fileType: string) {
    if (this.studentId) {
      this._snackBar.open('Only the student may upload documents for their application', 'OK');
      return;
    }
    const file: File = (<HTMLInputElement>event.target).files![0];
    if (fileType === 'Essay') {
      this.uploadEssay(file);
    } else if (fileType === 'Transcript') {
      this.uploadTranscript(file);
    } else {
      this.uploadOtherDoc(file, fileType);
    }
  }

  ngOnDestroy(): void {
    this._snackBar.dismiss();
    this.headerService.deactivateRoute('application');
    this.bioCommentsSub.unsubscribe();
    this.bioStoreSub.unsubscribe();
    this.bioService.clearDocs();
  }

  onSaveApplication() {
    console.log('documents validity')
    console.log(this.documents.valid);
    if (this.studentId) {
      this._snackBar.open('Only the student that owns this application has permission to edit it', 'OK');
      return;
    }
    const bioAppToServer = {
      studentAcademicInfo: {
        ...this.studentAcademicInfo.value,
        completed: this.studentAcademicInfo.valid,
      },
      emergencyContactInfo: {
        ...this.emergencyContactInfo.value,
        completed: this.emergencyContactInfo.valid,
      },
      mentorInfo: {
        ...this.mentorInfo.value,
        completed: this.mentorInfo.valid,
      },
      internshipInfo: {
        ...this.internshipInfo.value,
        completed: this.internshipInfo.valid,
      },
      educationalObjectives: {
        ...this.educationalObjectives.value,
        completed: this.educationalObjectives.valid,
      },
      documents: {
        essay: this.getEssay().value,
        transcript: this.getTranscript().value,
        otherDoc: this.getOtherDocument().value,
        completed: this.documents.valid,
      },
      signature: {
        ...this.signature.value,
        completed: this.signature.valid,
      },
    };

    bioStore.next(
      [
        {...this.studentAcademicInfo.value},
        {...this.emergencyContactInfo.value},
        {...this.mentorInfo.value},
        {...this.internshipInfo.value},
        {...this.educationalObjectives.value},
        {...this.signature.value}
      ]
    );

    this.bioService.saveApplication(bioAppToServer);
    this.studentService.setAppProgress(this.calcAppProgress());
    if (this.studentService.getAppStatus() !== this.progressType.IN_PROGRESS && this.studentService.getAppStatus() !== this.progressType.NEEDS_CHANGES) {
      this.studentService.setAppStatus(this.progressType.IN_PROGRESS);
    }
    this._snackBar.open('Application was saved!', 'OK');
  }

  calcAppProgress() {
    this.bioApplication = this._formBuilder.array([
      this.studentAcademicInfo,
      this.emergencyContactInfo,
      this.mentorInfo,
      this.internshipInfo,
      this.educationalObjectives,
      this.documents,
      this.signature,
    ]);

    let totalControls = 52;
    if (this.internshipInfo.get('committeeSites')?.value !== 'other' && this.internshipInfo.get('studentEmployedHere')?.value === 'no') {
      this.clearStudentEmploymentInfo();
      totalControls = 30;
    } else if (this.internshipInfo.get('committeeSites')?.value !== 'other' && this.internshipInfo.get('studentEmployedHere')?.value === 'yes') {
      totalControls = 35;
    } else if (this.internshipInfo.get('committeeSites')?.value === 'other' && this.internshipInfo.get('studentEmployedHere')?.value === 'no') {
      this.clearStudentEmploymentInfo();
      totalControls = 47;
    }

    let validControls = 0;
    console.log('ABOUT TO CALC CONTROLS....')
    for (let i = 0; i < this.bioApplication.length; i++) {
      for (let v in this.bioApplication.controls[i].value) {
        if (this.bioApplication.controls[i].value[v] !== '' && this.bioApplication.controls[i].value[v] !== null && !Array.isArray(this.bioApplication.controls[i].value[v])) {
          validControls += 1;
        } else if (Array.isArray(this.bioApplication.controls[i].value[v])) {
          if (this.bioApplication.controls[i].value[v].length !== 0) {
            if (v === 'essay' || v === 'transcript') {
              validControls += 1;
            }
          }
        }
      }
    }
    console.log('totalControls: ' + totalControls);
    console.log('validControls: ' + validControls);
    console.log('Percent complete: ', Number((validControls / totalControls) * 100).toFixed(2).toString());

    return Number((validControls / totalControls) * 100).toFixed(2);
  }

  isStudent() {
    return !!this.studentId;
  }

  handleEditorInit(e: any) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  toggleInstructionsMode() {
    if (this.instructionsMode === 'view') {
      this.instructionsMode = 'edit';
    } else if (this.instructionsMode === 'edit') {
      this.instructionsMode = 'view';
    }
  }

  onSubmitInstructions() {
    this.instructionsLoading = true;
    this.bioService.updateInstructions(this.instructions.controls['body'].value).subscribe(() => {
      // TODO timeout only here for demonstration purposes. must be removed if app deployed.
      setTimeout(() => {
        this.instructionsLoading = false;
        this.toggleInstructionsMode();
      }, 3000)
    })
  }

  loadInstructions() {
    this.bioService.getInstructions().subscribe((res) => {
      this.instructions.controls['body'].patchValue(res.instructions);
    })
  }

  addComment(threadId: string) {
    console.log(threadId)
    this.commentService.open(false, threadId);
  }

  openDialog(threadId: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.commentService.deleteCommentThread(threadId)
      }
    })
  }

  clearStudentEmploymentInfo() {
    this.internshipInfo.get('studentPosition')?.reset()
    this.internshipInfo.get('studentPayStatus')?.reset()
    this.internshipInfo.get('studentAvgWorkingHours')?.reset()
    this.internshipInfo.get('studentInternshipVsWork')?.reset()
    this.internshipInfo.get('studentPersonalConnection')?.reset()
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: BioDoc): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  refreshDocsTable() {
    this.selection.clear();
    this.dataSource = new MatTableDataSource<BioDoc>(this.bioDocs.value);
  }

  get bioDocs() {
    return this.bioService.bioDocs;
  }

  getEssay(): FormArray {
    return this.documents.get('essay') as FormArray;
  }

  getTranscript(): FormArray {
    return this.documents.get('transcript') as FormArray;
  }

  getOtherDocument(): FormArray {
    return this.documents.get('otherDoc') as FormArray;
  }

  downloadFiles(file: any) {
    if (this.studentId) {
      if (this.selection.selected.length > 0) {
        this.selection.selected.forEach((doc) => {
          this.bioService.downloadDoc(doc.fileType, doc.filePath, doc.fileName, this.studentId);
        });
      } else {
        this.bioService.downloadDoc(file.fileType, file.filePath, file.fileName, this.studentId);
      }
    } else {
      if (this.selection.selected.length > 0) {
        this.selection.selected.forEach((doc) => {
          this.bioService.downloadDoc(doc.fileType, doc.filePath, doc.fileName);
        });
      } else {
        this.bioService.downloadDoc(file.fileType, file.filePath, file.fileName);
      }
    }
  }

  deleteFiles(file: any) {
    if (this.studentId) {
      this._snackBar.open('Only the student may delete their documents.', 'OK');
      return;
    }
    if (this.selection.selected.length > 0) {
      let deleteEssay = false;
      let deleteTranscript = false;
      this.selection.selected.forEach((doc) => {
        this.bioService.deleteDoc(doc.fileType, doc.filePath)
        if (doc.fileType.toLowerCase() === 'essay') {
          deleteEssay = true;
        } else if (doc.fileType.toLowerCase() === 'transcript') {
          deleteTranscript = true;
        }
      });
      if (deleteEssay) {
        this.getEssay().removeAt(0);
      }
      if (deleteTranscript) {
        this.getTranscript().removeAt(0);
      }
    } else {
      this.bioService.deleteDoc(file.fileType, file.filePath);
      if (file.fileType.toLowerCase() === 'essay') {
        this.getEssay().removeAt(0);
      } else if (file.fileType.toLowerCase() === 'transcript') {
        this.getTranscript().removeAt(0);
      }
    }
    this.studentService.setAppProgress(this.calcAppProgress());
  }

  uploadEssay(file: File) {
    const docInfo = {
      fileName: file.name,
      fileType: "Essay",
      dateUploaded: new Date(Date.now()).toLocaleDateString()
    }
    this.bioService.uploadDoc(
      docInfo,
      file).subscribe((res) => {
      this.updateEssay(res.documents.essay[0])
      this.bioService.updateDocs(res);
      this.studentService.setAppProgress(this.calcAppProgress());
    });
    this.essayFileName = file.name;
  }

  updateEssay(essay: BioDoc) {
    if (this.getEssay().length > 0) {
      this.getEssay().at(0).patchValue(essay);
    } else {
      this.getEssay().insert(0, this._formBuilder.control(essay));
    }
  }

  uploadTranscript(file: File) {
    const docInfo = {
      fileName: file.name,
      fileType: "Transcript",
      dateUploaded: new Date(Date.now()).toLocaleDateString()
    }
    this.bioService.uploadDoc(
      docInfo,
      file).subscribe((res) => {
      this.updateTranscript(res.documents.transcript[0]);
      this.bioService.updateDocs(res);
      this.studentService.setAppProgress(this.calcAppProgress());
    });
    this.transcriptFileName = file.name;
  }

  updateTranscript(transcript: BioDoc) {
    if (this.getTranscript().length > 0) {
      this.getTranscript().at(0).patchValue(transcript);
    } else {
      this.getTranscript().insert(0, this._formBuilder.control(transcript));
    }
  }

  uploadOtherDoc(file: File, fileType: string) {
    const docInfo = {
      fileName: file.name,
      fileType: fileType,
      dateUploaded: new Date(Date.now()).toLocaleDateString()
    }
    this.bioService.uploadDoc(
      docInfo,
      file).subscribe((res) => {
      this.updateOtherDoc(res.documents.otherDoc[res.documents.otherDoc.length - 1]);
      this.bioService.updateDocs(res);
      this.studentService.setAppProgress(this.calcAppProgress());
    });
    this.otherFileName = file.name;
  }

  updateOtherDoc(otherDoc: BioDoc) {
    if (this.getOtherDocument().length > 0) {
      this.getOtherDocument().push(this._formBuilder.control(otherDoc));
    } else {
      this.getOtherDocument().insert(0 , this._formBuilder.control(otherDoc));
    }
  }
}



