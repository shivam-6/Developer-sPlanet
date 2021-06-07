import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit {
  videoList = [];
  url = app_config.api_url + '/';
  loading = true;
  constructor(
    private userService: UserService,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.fetchVideos(this.userService.currentUser.following);
  }

  fetchVideos(dev_ids) {
    for (let id of dev_ids) {
      this.videoService.getByUser(id).subscribe((data) => {
        console.log(data);
        this.videoList = this.videoList.concat(data);
        this.loading = false;
      });
    }
  }
}
