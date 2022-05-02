import {NgModule} from "@angular/core";
import {AngularMaterialModule} from "../angular-material.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { StudentHomeComponent } from "./student-home/student-home.component";
import { StudentApplicationComponent } from './student-home/student-application/student-application.component';
import {StudentRoutingModule} from "./student-routing.module";
import {MatSelectModule} from "@angular/material/select";
import {StudentApplyComponent} from "./student-apply/student-apply.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatBadgeModule} from "@angular/material/badge";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BioModule} from "../departments/bio/bio.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AnnouncementsModule} from "../announcements/announcements.module";
import {ProfileModule} from "../user/profile/profile.module";

@NgModule({
  declarations: [
    StudentHomeComponent,
    StudentApplicationComponent,
    StudentApplyComponent
  ],
  exports: [
    StudentApplicationComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    StudentRoutingModule,
    MatSelectModule,
    MatGridListModule,
    MatBadgeModule,
    MatStepperModule,
    MatTooltipModule,
    BioModule,
    MatCheckboxModule,
    AnnouncementsModule,
    ProfileModule,
  ]
})
export class StudentModule {}
