import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbToastrModule,
  NbSearchModule,
  NbSelectModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LayoutComponent as AdminLayout } from './admin/layout/layout.component';
import { LayoutComponent as UserLayout } from './user/layout/layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NebularModule } from './modules/nebular/nebular.module';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { LayoutComponent } from './authentication/layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';

import { NgsRevealModule } from 'ngx-scrollreveal';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { app_config } from 'src/config';
import { AddVideoComponent } from './user/add-video/add-video.component';
import { HomeComponent } from './authentication/home/home.component';
import { ManageVideoComponent } from './user/manage-video/manage-video.component';
import { ViewVideoComponent } from './authentication/view-video/view-video.component';
import { ListVideoComponent } from './authentication/list-video/list-video.component';
import { CreateQueryComponent } from './user/create-query/create-query.component';
import { ListQueriesComponent } from './list-queries/list-queries.component';
import { ManageQueriesComponent } from './user/manage-queries/manage-queries.component';
import { QueryDetailsComponent } from './query-details/query-details.component';
import { MarkdownModule } from 'ngx-markdown';
import { CreateSolutionComponent } from './user/create-solution/create-solution.component';
import { ChatComponent } from './chat/chat.component';
import { ContactUsComponent } from './authentication/contact-us/contact-us.component';
import { AboutUsComponent } from './authentication/about-us/about-us.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { RecommendationsComponent } from './user/recommendations/recommendations.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayout,
    UserLayout,
    DashboardComponent,
    SigninComponent,
    SignupComponent,
    ResetPasswordComponent,
    LayoutComponent,
    ProfileComponent,
    ManageUsersComponent,
    AddVideoComponent,
    HomeComponent,
    ManageVideoComponent,
    ViewVideoComponent,
    ListVideoComponent,
    CreateQueryComponent,
    ListQueriesComponent,
    ManageQueriesComponent,
    QueryDetailsComponent,
    CreateSolutionComponent,
    ChatComponent,
    ContactUsComponent,
    AboutUsComponent,
    FooterComponent,
    RecommendationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NebularModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module,
    SocialLoginModule,
    MatSnackBarModule,
    NbToastrModule.forRoot(),
    MarkdownModule.forRoot(),
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    NbSearchModule,
    NbSelectModule,
  ],
  exports: [MatFormFieldModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(app_config.OAuthID),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
