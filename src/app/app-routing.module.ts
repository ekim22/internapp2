import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from "./posts/post-list/post-list.component";
import {PostCreateComponent} from "./posts/post-create/post-create.component";
import {AuthGuard} from "./auth/auth.guard";
import {HomeComponent} from "./home/home.component";
import {ItecComponent} from "./applications/itec/itec.component";
import {BioComponent} from "./applications/bio/bio.component";

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent},
  { path: 'bio', canActivate: [AuthGuard], component: BioComponent},
  { path: 'itec', canActivate: [AuthGuard], component: ItecComponent},
  { path: 'posts', canActivate: [AuthGuard], component: PostListComponent},
  { path: 'posts/create', canActivate: [AuthGuard], component: PostCreateComponent },
  { path: 'posts/edit/:postId', canActivate: [AuthGuard], component: PostCreateComponent },
  // Note: can't use /login or '' since /login is already set as the root for the auth-routing and '' is
  // set as root overall. So we make up a random path and go to auth.module from there.
  // All the routes
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
