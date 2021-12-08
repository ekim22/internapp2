import {NgModule} from "@angular/core";

import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import {AngularMaterialModule} from "../angular-material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LinebreakPipe} from "../utils/linebreak.pipe";

import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    PostListComponent,
    PostCreateComponent,
    LinebreakPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
  ],
  exports: [
    // PostListComponent,
    PostCreateComponent,
    // LinebreakPipe
  ]
})
export class PostsModule {}
