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
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatBadgeModule} from "@angular/material/badge";
import {EditorModule} from "@tinymce/tinymce-angular";
import {SharedModule} from "../../shared/shared.module";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    BioComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EditorModule,
        MatTabsModule,
        MatStepperModule,
        MatFormFieldModule,
        MatSelectModule,
        MatExpansionModule,
        MatIconModule,
        MatTableModule,
        AngularMaterialModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatBadgeModule,
        SharedModule,
        MatCheckboxModule,
    ],
})
export class BioModule {}
