import {NgModule} from "@angular/core";

import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import {AngularMaterialModule} from "../angular-material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LinebreakPipe} from "../utils/linebreak.pipe";

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
  ],
  exports: [
    // PostListComponent,
    PostCreateComponent,
    LinebreakPipe
  ]
})
export class PostsModule {}
