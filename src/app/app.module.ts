import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {AuthInterceptor} from "./auth/auth-interceptor";
import {LinebreakPipe} from "./utils/linebreak.pipe";
import {ErrorInterceptor} from "./error-interceptor";
import { ErrorComponent } from './error/error.component';
import {AngularMaterialModule} from "./angular-material.module";
import {PostsModule} from "./posts/posts.module";
import { FormsComponent } from './forms/forms.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    FormsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule,
  ],
  // multi: true simply means there can be multi interceptors so don't override any
  // existing interceptors
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  exports: [
    LinebreakPipe
  ],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
