import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnnouncementsComponent} from "./announcements.component";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    AnnouncementsComponent,
  ],
  exports: [
    AnnouncementsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class AnnouncementsModule { }
