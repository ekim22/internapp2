import {Component, OnInit, QueryList} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApplicationsService} from "../applications.service";
import {MatStep} from "@angular/material/stepper";

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {
  isLinear = false;
  bioApplication!: FormArray;
  studentAcademicInfo!: FormGroup;
  emergencyContactInfo!: FormGroup;
  mentorInfo!: FormGroup;
  internshipInfo!: FormGroup;
  educationalObjectives!: FormGroup;
  uploadDocuments!: FormGroup;
  signature!: FormGroup;
  years! : {
    label: string,
    value: string
  }[]
  bioAppSites!: string[];
  siteIsOther: boolean = false;
  studentIsEmployed: boolean = false;
  siteSelected!: string;
  errorMsg: string = "Please check the form for errors, fill in required fields, and try again.";
  thing!: string;

  // Gonna get rid of this
  essayFileName!: string;
  transcriptFileName!: string;
  otherFileName!: string;

  constructor(private _formBuilder: FormBuilder,
              private applicationsService: ApplicationsService) {}

  ngOnInit() {
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
        studentEmploymentStatus: ['', Validators.required],
        studentPosition: ['', Validators.required],
        studentPayStatus: ['', Validators.required],
        studentAvgWorkingHours: ['', Validators.required],
        studentInternshipVsWork: ['', Validators.required],
        studentPersonalConnection: ['', Validators.required],
      }),
      this.educationalObjectives = this._formBuilder.group({
        firstObjective: ['', Validators.required],
        secondObjective: ['', Validators.required],
        thirdObjective: ['', Validators.required],
      }),
      this.uploadDocuments = this._formBuilder.group({
        essay: ['', Validators.required],
        transcript: ['', Validators.required],
        otherDoc: ['',]
      }),
      this.signature = this._formBuilder.group({
        signature: ['', Validators.required],
      }),
    ])
    this.years = this.applicationsService.years;
    this.bioAppSites = this.applicationsService.getBioAppSites();
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
