import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StudentHomeComponent} from "./student-home/student-home.component";
import {StudentApplicationComponent} from "./student-application/student-application.component";

const routes: Routes = [
  { path: 'home', component: StudentHomeComponent },
  { path: 'application', component: StudentApplicationComponent }
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
