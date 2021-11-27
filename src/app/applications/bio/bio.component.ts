import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApplicationsService} from "../applications.service";

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {
  isLinear = false;
  studentAcademicInfo!: FormGroup;
  emergencyContactInfo!: FormGroup;
  mentorInfo!: FormGroup;
  internshipInfo!: FormGroup;
  educationalObjectives!: FormGroup;
  signature!: FormGroup;
  years! : {
    label: string,
    value: string
  }[]

  constructor(private _formBuilder: FormBuilder,
              private applicationsService: ApplicationsService) {}

  ngOnInit() {
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
    });
    this.emergencyContactInfo = this._formBuilder.group({
      contactName: ['', Validators.required],
      contactAddress: ['', Validators.required],
      contactCity: ['', Validators.required],
      contactState: ['', Validators.required],
      contactZip: ['', Validators.required],
      contactPhone: ['', Validators.required],
      contactEmail: ['', Validators.required],
    });
    this.mentorInfo = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    this.internshipInfo = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
    });
    this.educationalObjectives = this._formBuilder.group({
      fifthCtrl: ['', Validators.required],
    });
    this.signature = this._formBuilder.group({
      sixthCtrl: ['', Validators.required],
    });
    this.years = this.applicationsService.years
  }
}
