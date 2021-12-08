import {NgModule} from "@angular/core";
import {AngularMaterialModule} from "../angular-material.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import {AdminRoutingModule} from "./admin-routing.module";


@NgModule({
  declarations: [
    AdminHomeComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    AdminRoutingModule,
  ]
})
export class AdminModule {}
