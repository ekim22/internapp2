import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {StudentService} from "../student.service";
import {BioService} from "../../departments/bio/bio.service";
import {AppProgressType} from "../../shared/models/AppProgressType";
import {AppDeptTypes} from "../../shared/models/AppDeptTypes";

@Component({
  selector: 'app-student-apply',
  templateUrl: './student-apply.component.html',
  styleUrls: ['./student-apply.component.css']
})
export class StudentApplyComponent {
  appDeptType = AppDeptTypes;
  progressType = AppProgressType;
  disableSelect = new FormControl(false);
  program: string = '';


  constructor(private router: Router,
              private studentService: StudentService,
              private bioService: BioService) { }

  onSubmit() {
    if (this.program.toLowerCase() === 'bio') {
      this.studentService.setAppType('bio');
      this.studentService.setAppStatus(this.progressType.NOT_STARTED);
      this.studentService.setAppProgress('0.0');
      this.bioService.saveApplication(
        {
          documents: {
            essay: [],
            transcript: [],
            otherDoc: [],
            completed: false
          },
          educationalObjectives: {completed: false, firstObjective: "", secondObjective: "", thirdObjective: ""},
          emergencyContactInfo: {
            completed: false,
            contactAddress: "",
            contactCity: "",
            contactEmail: "",
            contactFirstName: "",
            contactLastName: "",
            contactPhone: "",
            contactState: "",
            contactZip: ""
          },
          internshipInfo: {
            committeeSites: "",
            completed: false,
            managerEmail: "",
            managerFirstName: "",
            managerLastName: "",
            managerTitle: "",
            preceptorEmail: "",
            preceptorFirstName: "",
            preceptorLastName: "",
            preceptorManagerStatus: "",
            preceptorPhone: "",
            preceptorTitle: "",
            siteAddress: "",
            siteCity: "",
            siteName: "",
            sitePhone: "",
            siteSpecialty: "",
            siteState: "",
            siteZip: "",
            studentAvgWorkingHours: "",
            studentEmployedHere: "",
            studentInternshipVsWork: "",
            studentPayStatus: "",
            studentPersonalConnection: "",
            studentPosition: ""
          },
          mentorInfo: {
            completed: false,
            mentorEmail: "",
            mentorFirstName: "",
            mentorLastName: "",
            mentorOffice: "",
            mentorPhone: ""
          },
          signature: {completed: false, printedSignature: ""},
          studentAcademicInfo: {
            completed: false,
            concentration: "",
            desiredInternshipSemester: "",
            desiredInternshipYear: "",
            expectedGradSemester: "",
            expectedGradYear: "",
            hoursCompleted: "",
            intendedProfession: "",
            overallGPA: "",
            programGPA: ""
          }

        }
      )
      this.router.navigate(['/bio'])
    } else if (this.program.toLowerCase() === 'itec') {
      this.studentService.setAppType('itec');
      this.router.navigate(['/itec'])
    }
  }

}
