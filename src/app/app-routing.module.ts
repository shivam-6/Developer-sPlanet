import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LayoutComponent as AdminLayout } from './admin/layout/layout.component';
import { LayoutComponent as UserLayout } from './user/layout/layout.component';
import { LayoutComponent as AppLayoutComponent } from './authentication/layout/layout.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { AdminGuard } from './guards/admin.guard';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginGuard } from './guards/login.guard';
import { AddVideoComponent } from './user/add-video/add-video.component';
import { ManageVideoComponent } from './user/manage-video/manage-video.component';
import { HomeComponent } from './authentication/home/home.component';
import { ListVideoComponent } from './authentication/list-video/list-video.component';
import { ViewVideoComponent } from './authentication/view-video/view-video.component';

const routes: Routes = [
  { path: '', redirectTo: '/app/signin', pathMatch: 'full' },
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'reset', component: ResetPasswordComponent },
      { path: 'home', component: HomeComponent },
      { path: 'view/:id', component: ViewVideoComponent },
      { path: 'list', component: ListVideoComponent },
    ],
  },

  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manageuser', component: ManageUsersComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  {
    path: 'user',
    component: UserLayout,
    canActivate: [LoginGuard],
    children: [
      { path: '', component: ProfileComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'addvideo', component: AddVideoComponent },
      { path: 'managevideo', component: ManageVideoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
