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
import { CreateQueryComponent } from './user/create-query/create-query.component';
import { ListQueriesComponent } from './list-queries/list-queries.component';
import { ManageQueriesComponent } from './user/manage-queries/manage-queries.component';
import { QueryDetailsComponent } from './query-details/query-details.component';
import { CreateSolutionComponent } from './user/create-solution/create-solution.component';
import { ChatComponent } from './chat/chat.component';
import { ContactUsComponent } from './authentication/contact-us/contact-us.component';
import { AboutUsComponent } from './authentication/about-us/about-us.component';
import { RecommendationsComponent } from './user/recommendations/recommendations.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'reset', component: ResetPasswordComponent },
      { path: 'view/:id', component: ViewVideoComponent },
      { path: 'listvideo', component: ListVideoComponent },
      { path: 'listquery', component: ListQueriesComponent },
      { path: 'querydetails/:id', component: QueryDetailsComponent },
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
      { path: 'managequery', component: ManageQueriesComponent },
      { path: 'query', component: CreateQueryComponent },
      { path: 'solution/:id', component: CreateSolutionComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'contactus', component: ContactUsComponent },
      { path: 'aboutus', component: AboutUsComponent },
      { path: 'recommendations', component: RecommendationsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
