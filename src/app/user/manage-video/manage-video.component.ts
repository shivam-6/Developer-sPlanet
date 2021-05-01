import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-video',
  templateUrl: './manage-video.component.html',
  styleUrls: ['./manage-video.component.css']
})
export class ManageVideoComponent implements OnInit {
  videosList: any;
  loadingVideos = true; 
 

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchVideos();
  }

  fetchVideos() {
    this.userService.getAll().subscribe((res) => {
      this.videosList = res;
      this.loadingVideos = false;
    
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
        this.userService.deleteVideo(id).subscribe((res) => {
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

