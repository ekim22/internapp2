import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import {AdminGuard} from "./admin.guard";


const routes: Routes = [
  {
    path: 'home',
    component: AdminHomeComponent,
    canActivate: [AdminGuard],
    data: {
      expectedRole: 'admin'
    }
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
export class AdminRoutingModule {}
