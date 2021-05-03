import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';
import { app_config } from 'src/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-video',
  templateUrl: './manage-video.component.html',
  styleUrls: ['./manage-video.component.css'],
})
export class ManageVideoComponent implements OnInit {
  videosList: any;
  loadingVideos = true;
  url = app_config.api_url + '/';

  constructor(
    public userService: UserService,
    private router: Router,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.fetchVideos();
  }

  fetchVideos() {
    this.videoService.getAll().subscribe((res) => {
      this.videosList = res;
      this.loadingVideos = false;
      console.log(this.videosList);
    });
  }

  deleteVideo(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.videoService.deleteVideo(id).subscribe((res) => {
          console.log(res);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your blog has been deleted.',
            icon: 'info',
          }).then(() => {
            this.fetchVideos();
          });
        });
      }
    });
  }

  updateUser(id) {}
}
