import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StudentHomeComponent} from "./student-home/student-home.component";
import {StudentApplicationComponent} from "./student-home/student-application/student-application.component";
import {StudentApplyComponent} from "./student-apply/student-apply.component";
import {AuthGuard} from "../auth/auth.guard";

const routes: Routes = [
  {
    path: 'home',
    component: StudentHomeComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'student' },
  },
  { path: 'apply', component: StudentApplyComponent },
  { path: 'application', component: StudentApplicationComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class StudentRoutingModule {}
