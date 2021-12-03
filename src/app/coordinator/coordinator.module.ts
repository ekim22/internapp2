import {NgModule} from "@angular/core";
import {AngularMaterialModule} from "../angular-material.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CoordinatorHomeComponent} from "./coordinator-home/coordinator-home.component";
import {CoordinatorRoutingModule} from "./coordinator-routing.module";


@NgModule({
  declarations: [
    CoordinatorHomeComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    CoordinatorRoutingModule
  ]
})
export class CoordinatorModule {}
