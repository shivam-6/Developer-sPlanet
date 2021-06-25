import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupform: any;
  avatarImage: any;
  erroMsg: string;
  imgURL: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initSignupForm();
    document
      .getElementsByTagName('nb-layout-column')[0]
      .classList.add('register');
  }

  ngOnDestroy() {
    document
      .getElementsByTagName('nb-layout-column')[0]
      .classList.remove('register');
  }

  initSignupForm() {
    this.signupform = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        avatar:  '',
        email: ['', Validators.email],
        password: ['', Validators.required],
        confirm: ['', Validators.required],
        age: [0, Validators.required],
        gender: ['', Validators.required],
        mobile: [0, Validators.required],
        created: new Date(),
        isadmin: false,
        followers: Array,
        following: Array,
      },
      { validator: this.matchPassword('password', 'confirm') }
    );
  }

  matchPassword(password, repassword) {
    return (registerForm) => {
      let control1 = registerForm.controls[password];
      let control2 = registerForm.controls[repassword];

      if (control1.value !== control2.value) {
        control2.setErrors({ match: true });
      } else {
        control2.setErrors(null);
      }
    };
  }

  uploadAvatar(event: any) {
    let files = event.target.files;
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      Swal.fire('Images Only');
      return;
    }
    this.preview(event.target.files);
    let formData = new FormData();
    this.avatarImage = files[0].name;
    formData.append('file', files[0], files[0].name);
    this.userService.uploadAvatar(formData).subscribe((response) => {
      console.log(response);
    });
  }

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.erroMsg = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  submitSignupForm() {
    if (!this.signupform.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Ooops!',
        text: 'Invalid Form',
      });
      return;
    }
    let formdata = this.signupform.value;
    formdata.avatar = this.avatarImage;
    this.userService.addUser(formdata).subscribe((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Great!',
        text: 'Successfully Registered, Now Login to Continue.',
      }).then(() => {
        this.router.navigate(['/app/signin']);
      });
    });
  }
}
