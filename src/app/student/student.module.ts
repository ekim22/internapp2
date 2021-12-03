import {NgModule} from "@angular/core";
import {AngularMaterialModule} from "../angular-material.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { StudentHomeComponent } from "./student-home/student-home.component";
import { StudentApplicationComponent } from './student-application/student-application.component';
import {StudentRoutingModule} from "./student-routing.module";

@NgModule({
  declarations: [
    StudentHomeComponent,
    StudentApplicationComponent,
  ],
  exports: [
    StudentApplicationComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    StudentRoutingModule,
  ]
})
export class StudentModule {}
