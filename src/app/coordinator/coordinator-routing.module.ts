import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CoordinatorHomeComponent} from "./coordinator-home/coordinator-home.component";


const routes: Routes = [
  { path: 'home', component: CoordinatorHomeComponent },
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
