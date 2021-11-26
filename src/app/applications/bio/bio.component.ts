import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
      firstCtrl: ['', Validators.required],
    });
    this.emergencyContactInfo = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
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
