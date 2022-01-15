import {Component, OnDestroy, OnInit, QueryList, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HeaderService} from "../../header/header.service";
import {BioService} from "./bio.service";
import {MatTable} from "@angular/material/table";
import {MatStep} from "@angular/material/stepper";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StudentService} from "../../student/student.service";
import {BehaviorSubject, combineLatest, Observable, Subscription} from "rxjs";
import {debounceTime, map, shareReplay, startWith, tap} from "rxjs/operators";
import * as equal from "fast-deep-equal"

// TODO save bio form fields into store and load only if it's the same user.
export const bioStore = new BehaviorSubject({})

export const bioStore$ = bioStore.asObservable();

export function dirtyCheck<U>(source: Observable<U>) {
  return function<T>(valueChanges: Observable<T>): Observable<boolean> {

    const isDirty$ = combineLatest(
      source,
      valueChanges,
    ).pipe(
      debounceTime(300),
      tap(([a,b]) => {
        console.log(a)
        console.log(b)
      }),
      map(([a, b]) => equal(a, b)),
      startWith(true),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
    return isDirty$;
  };
}

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit, OnDestroy {
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
  bioDocs!: {}[];
  // this needs to link up to the data type but also the order in the array here determines the order of the columns in the table. The defs here are what go into matColumnDef in html.
  displayedColumns: string[] = ['position', 'filename', 'filetype', 'date uploaded'];
  siteIsOther: boolean = false;
  studentIsEmployed: boolean = false;
  siteSelected!: string;
  private siteValidators = [
    Validators.required
  ]

  errorMsg: string = "Please check the form for errors, fill in required fields, and resubmit.";
  thing!: string;
  bioStoreListener!: Subscription;
  isDirty$!: Observable<boolean>;

  // Going to get rid of these
  bioApp!: any;
  essayFileName!: string;
  transcriptFileName!: string;
  otherFileName!: string;
  @ViewChild(MatTable) table!: MatTable<{pos: number, filetype: string, filename: string}>

  constructor(private _formBuilder: FormBuilder,
              private bioService: BioService,
              private headerService: HeaderService,
              private _snackBar: MatSnackBar,
              private studentService: StudentService) {}

  ngOnInit() {
    this.headerService.activateRoute('application');
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
      })
    this.emergencyContactInfo = this._formBuilder.group({
      contactFirstName: ['', Validators.required],
      contactLastName: ['', Validators.required],
      contactAddress: ['', Validators.required],
      contactCity: ['', Validators.required],
      contactState: ['', Validators.required],
      contactZip: ['', Validators.required],
      contactPhone: ['', Validators.required],
      contactEmail: ['', Validators.required],
    })
    this.mentorInfo = this._formBuilder.group({
      mentorFirstName: ['', Validators.required],
      mentorLastName: ['', Validators.required],
      mentorOffice: ['', Validators.required],
      mentorPhone: ['', Validators.required],
      mentorEmail: ['', Validators.required],
    })
    this.internshipInfo = this._formBuilder.group({
      committeeSites: ['', Validators.required],
      siteName: ['', Validators.required],
      siteSpecialty: ['', Validators.required],
      siteAddress: ['', Validators.required],
      siteCity: ['', Validators.required],
      siteState: ['', Validators.required],
      siteZip: ['', Validators.required],
      sitePhone: ['', Validators.required],
      managerFirstName: ['', Validators.required],
      managerLastName: ['', Validators.required],
      managerTitle: ['', Validators.required],
      managerEmail: ['', Validators.required],
      preceptorFirstName: ['', Validators.required],
      preceptorLastName: ['', Validators.required],
      preceptorPhone: ['', Validators.required],
      preceptorEmail: ['', Validators.required],
      preceptorTitle: ['', Validators.required],
      preceptorManagerStatus: ['', Validators.required],
      studentEmployedHere: ['', Validators.required],
      studentPosition: ['', Validators.required],
      studentPayStatus: ['', Validators.required],
      studentAvgWorkingHours: ['', Validators.required],
      studentInternshipVsWork: ['', Validators.required],
      studentPersonalConnection: ['', Validators.required],
    })
    this.educationalObjectives = this._formBuilder.group({
      firstObjective: ['', Validators.required],
      secondObjective: ['', Validators.required],
      thirdObjective: ['', Validators.required],
    })
    this.documents = this._formBuilder.group({
      essay: ['', Validators.required],
      transcript: ['', Validators.required],
      otherDoc: ['',],
    })
    this.signature = this._formBuilder.group({
      signature: ['', Validators.required],
    })
    this.years = this.bioService.years;
    this.bioAppSites = this.bioService.getBioAppSites();
    this.bioDocs = this.bioService.getDocs();

    this.bioStoreListener = this.bioService.getApplication().subscribe(res => {
      this.bioApp = res.application;
      if (this.bioApp) {
        Object.keys(this.bioApp).forEach(key => {
          if (key !== '_id' && key !== 'userId' && key !== '__v') {
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
                }
              }
              else if (key === 'educationalObjectives') {
                this.educationalObjectives.get(value)?.patchValue(this.bioApp[key][value]);
              }
              else if (key === 'documents') {
                this.documents.get(value)?.patchValue(this.bioApp[key][value]);
              }
              else if (key === 'signature') {
                this.signature.get(value)?.patchValue(this.bioApp[key][value]);
              }
            })
          }
        });
      }
    })

    bioStore$.subscribe(state => {
      this.studentAcademicInfo.patchValue(state);
      this.emergencyContactInfo.patchValue(state);
      this.mentorInfo.patchValue(state);
      this.internshipInfo.patchValue(state);
      this.educationalObjectives.patchValue(state);
      this.documents.patchValue(state);
      this.signature.patchValue(state);
    });

    this.isDirty$ = merge(
      this.studentAcademicInfo.valueChanges,
      this.emergencyContactInfo.valueChanges,
      this.mentorInfo.valueChanges,
      this.internshipInfo.valueChanges,
      this.educationalObjectives.valueChanges,
      this.documents.valueChanges,
      this.signature.valueChanges
    ).pipe(
      dirtyCheck(bioStore$)
    )

  }

  onCommitteeSiteChange(selectedSite: Event) {
    this.siteIsOther = String(selectedSite) === 'other';
  }

  onStudentEmploymentChange(isStudentEmployedAtSite: Event) {
    this.studentIsEmployed = String(isStudentEmployedAtSite) === 'yes';
  }

  onSiteSelected(siteName: Event) {
    this.siteSelected = String(siteName);
  }

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
      console.log(this.bioApplication)
    }
  }

  onFilePicked(event: Event, fileType: string) {
    const file: File = (<HTMLInputElement>event.target).files![0];
    if (fileType === 'essay') {
      this.essayFileName = file.name
      this.uploadDocuments.patchValue({essay: this.essayFileName})
    } else if (fileType === 'transcript') {
      this.transcriptFileName = file.name
      this.uploadDocuments.patchValue({transcript: this.transcriptFileName})
    } else if (fileType === 'other') {
      this.otherFileName = file.name
      this.uploadDocuments.patchValue({other: this.otherFileName})
    }
  }


}
