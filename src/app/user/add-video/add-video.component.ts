import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NbTagComponent, NbTagInputDirective } from '@nebular/theme';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css'],
})
export class AddVideoComponent implements OnInit {
  videoform: any;
  avatarImage: any;
  erroMsg: string;
  imgURL: string | ArrayBuffer = 'assets/images/default-thumbnail.jpg';
  videofilename;
  @ViewChild(NbTagInputDirective, { read: ElementRef })
  tagInput: ElementRef<HTMLInputElement>;

  topics = [
    'Angular',
    'JavaScript',
    'React',
    'MEAN stack',
    'TypeScript',
    'Angular 11',
    'c',
    'c++',
    'php',
    'html'
  ];

  selTopics = ['Angular'];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private videoService: VideoService
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

  initAddVideoForm() {
    this.videoform = this.fb.group({
      title: '',
      desc: '',
      data: {},
      created: new Date(),
      developer: this.userService.currentUser,
      views: Array,
      upvotes: Array,
      comments: Array,
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
    formData.append('file', files[0], files[0].name);
    this.userService.uploadAvatar(formData).subscribe((response) => {
      console.log(response);
    });
  }

  uploadVideo(event) {
    let files = event.target.files;
    if (files.length === 0) return;

    let formData = new FormData();
    this.videofilename = files[0].name;
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

  submitAddVideoForm() {
    let formdata = this.videoform.value;
    formdata.thumb = this.avatarImage;
    formdata.file = this.videofilename;
    formdata.data['topics'] = this.selTopics;

    this.videoService.addVideo(formdata).subscribe((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Great!',
        text: 'Video Uploaded',
      });
    });
  }

  onTopicRemove(tagToRemove: NbTagComponent): void {
    let index = this.selTopics.indexOf(tagToRemove.text);
    if (index > -1) {
      this.selTopics.splice(index, 1);
    }
    this.topics.push(tagToRemove.text);
  }
  onTopicAdd(value: string): void {
    if (value) {
      this.selTopics.push(value);
      this.topics = this.topics.filter((t) => t !== value);
    }
    this.tagInput.nativeElement.value = '';
  }
}
