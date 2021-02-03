import { AuthGuard } from './shared/guards/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogCreateComponent } from './components/blogs/blog-create/blog-create.component';
import { ListBlogsComponent } from './components/blogs/list-blogs/list-blogs.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: ListBlogsComponent },
  { path: 'users-create-blog', component: BlogCreateComponent, canActivate: [ AuthGuard ] },
  { path: 'users-edit-blog/:blogId', component: BlogCreateComponent, canActivate: [ AuthGuard ] },
  { path: 'admin-list-users', component: ListUsersComponent, canActivate: [ AuthGuard ] },
  { path: 'users-profile/:userId', component: UserProfileComponent, canActivate: [ AuthGuard] },
  { path: 'users-update-user/:userId', component: UpdateUserComponent, canActivate: [ AuthGuard] },
  { path: 'users-create-profile', component: UpdateUserComponent, canActivate: [ AuthGuard ] },
  { path: 'auth', loadChildren: "./components/auth/auth.module#AuthModule"},
  //{ path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
