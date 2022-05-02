import {NgModule} from "@angular/core";
import {AngularMaterialModule} from "../angular-material.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoordinatorHomeComponent} from "./coordinator-home/coordinator-home.component";
import {CoordinatorRoutingModule} from "./coordinator-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSortModule} from "@angular/material/sort";
import {MatTabsModule} from "@angular/material/tabs";
import {EditorModule} from "@tinymce/tinymce-angular";
import {SharedModule} from "../shared/shared.module";
import {AnnouncementsModule} from "../announcements/announcements.module";


@NgModule({
  declarations: [
    CoordinatorHomeComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    CoordinatorRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatTabsModule,
    EditorModule,
    ReactiveFormsModule,
    SharedModule,
    AnnouncementsModule
  ]
})
export class CoordinatorModule {}
