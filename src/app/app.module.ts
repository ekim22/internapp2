import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import {AuthInterceptor} from "./auth/auth-interceptor";
import {ErrorInterceptor} from "./error-interceptor";
import { ErrorComponent } from './error/error.component';
import {AngularMaterialModule} from "./angular-material.module";
import { ItecComponent } from './departments/itec/itec.component';
import {BioModule} from "./departments/bio/bio.module";
import {PostsModule} from "./posts/posts.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import { ProfileComponent } from './user/profile/profile.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import {ProfileModule} from "./user/profile/profile.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    ItecComponent,
    ProfileComponent,
    AboutComponent,
    HelpComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule,
    ReactiveFormsModule,
    FormsModule,
    BioModule,
    MatSidenavModule,
    ProfileModule,
  ],
  // multi: true simply means there can be multi interceptors so don't override any
  // existing interceptors
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  exports: [
    // LinebreakPipe
  ],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
