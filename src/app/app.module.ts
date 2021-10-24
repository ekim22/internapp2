import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { PostListComponent } from './posts/post-list/post-list.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {AuthInterceptor} from "./auth/auth-interceptor";
import {LinebreakPipe} from "./utils/linebreak.pipe";

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    SignupComponent,
    LoginComponent,
    LinebreakPipe,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
    ],
  // multi: true simply means there can be multi interceptors so don't override any
  // existing interceptors
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
