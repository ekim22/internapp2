import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BioComponent} from "./bio.component";
import {CommonModule} from "@angular/common";
import {MatTabsModule} from "@angular/material/tabs";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {AngularMaterialModule} from "../../angular-material.module";

@NgModule({
  declarations: [
    BioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    AngularMaterialModule,
  ],
})
export class BioModule {}
