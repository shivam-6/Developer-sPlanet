import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-list-video',
  templateUrl: './list-video.component.html',
  styleUrls: ['./list-video.component.css'],
})
export class ListVideoComponent implements OnInit {
  videoList;
  loading = true;
  url = app_config.api_url + '/';

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.fetchVideos();
  }

  fetchVideos() {
    this.videoService.getAll().subscribe((data) => {
      this.videoList = data;
      this.loading = false;
      console.log(data);
    });
  }
}
