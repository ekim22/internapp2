import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {OverlayModule} from "@angular/cdk/overlay";
import {CommentComponent} from "./comment/comment.component";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {EditorModule} from "@tinymce/tinymce-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
    SpinnerOverlayComponent,
    CommentComponent,
    DialogComponent
  ],
  exports: [
    SpinnerOverlayComponent,
    CommentComponent
  ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        OverlayModule,
        MatCardModule,
        MatFormFieldModule,
        EditorModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule
    ]
})
export class SharedModule { }
