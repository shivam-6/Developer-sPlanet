import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinform: any;
  socialUser: SocialUser;
  isLoggedin: boolean;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.initSigninForm();
    document.getElementsByTagName('nb-layout-column')[0].classList.add('login');
    // document.body.classList.add('login');

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    
    });
  }

  ngOnDestroy() {
    document
      .getElementsByTagName('nb-layout-column')[0]
      .classList.remove('login');

  }

  initSigninForm() {
    this.signinform = this.fb.group({
      email: '',
      password: '',
    });
  }

  submitSigninForm() {
    let formdata = this.signinform.value;

    this.userService.getUserByEmail(formdata.email).subscribe((userdata) => {
      if (userdata) {
        if (userdata['password'] == formdata['password']) {
          Swal.fire({
            icon: 'success',
            title: 'Great!',
            text: 'Successfully Loggedin',
          }).then(() => {
            this.userService.loggedin = true;
            sessionStorage.setItem('user', JSON.stringify(userdata));
            this.userService.currentUser = userdata;

            if (userdata['isadmin']) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/user']);
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: "Email and Password does't match",
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: "Email and Password does't match",
        });
      }
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
