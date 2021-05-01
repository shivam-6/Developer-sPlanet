import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {

  videoform: any;
  avatarImage: any;
  erroMsg: string;
  imgURL: string | ArrayBuffer;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initAddVideoForm();
    document
      .getElementsByTagName('nb-layout-column')[0]
      .classList.add('AddVideo');
  }

  ngOnDestroy() {
    document
      .getElementsByTagName('nb-layout-column')[0]
      .classList.remove('upload');
  }

  initAddVideoForm () {
    this.videoform = this.fb.group({
      title: '',
      desc: '',
      // email: '',
      // password: '',
      // confirm: '',
      // age: 0,
      // created: new Date(),
      // isadmin: false,
    });
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
    formData.append('image', files[0], files[0].name);
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

  submitAddVideoForm() {
    let formdata = this.videoform.value;
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
