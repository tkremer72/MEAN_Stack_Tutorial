import { AuthGuard } from './shared/guards/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginComponent } from './components/auth/user-login/user-login.component';
import { UserRegistrationComponent } from './components/auth/user-registration/user-registration.component';
import { BlogCreateComponent } from './components/blogs/blog-create/blog-create.component';
import { ListBlogsComponent } from './components/blogs/list-blogs/list-blogs.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: ListBlogsComponent },
  { path: 'users-login', component: UserLoginComponent },
  { path: 'users-registration', component: UserRegistrationComponent },
  { path: 'create-blog', component: BlogCreateComponent, canActivate: [ AuthGuard ] },
  { path: 'edit-blog/:blogId', component: BlogCreateComponent, canActivate: [ AuthGuard ] },
  { path: 'admin-list-users', component: ListUsersComponent, canActivate: [ AuthGuard ] },
  { path: 'users-profile', component: UserProfileComponent, canActivate: [ AuthGuard ] },
  { path: 'update-user/:userId', component: UpdateUserComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
