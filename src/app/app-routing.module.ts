import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from "./posts/post-list/post-list.component";
import {PostCreateComponent} from "./posts/post-create/post-create.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: PostListComponent},
  { path: 'create', canActivate: [AuthGuard], component: PostCreateComponent },
  { path: 'edit/:postId', canActivate: [AuthGuard], component: PostCreateComponent },
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
