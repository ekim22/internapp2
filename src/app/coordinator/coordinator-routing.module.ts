import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CoordinatorHomeComponent} from "./coordinator-home/coordinator-home.component";
import {CoordinatorResolver} from "./coordinator.resolver";
import {AuthGuard} from "../auth/auth.guard";


const routes: Routes = [
  {
    path: 'home',
    component: CoordinatorHomeComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'coordinator' },
    resolve: { studentApplications: CoordinatorResolver },
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class CoordinatorRoutingModule {}
