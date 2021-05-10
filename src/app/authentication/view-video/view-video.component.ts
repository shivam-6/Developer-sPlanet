import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css'],
})
export class ViewVideoComponent implements OnInit {
  videoData;
  playtime = 0;
  countOn = 10;
  url = app_config.api_url + '/';
  constructor(
    private actRoute: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.videoService.getVideoById(id).subscribe((data) => {
      this.videoData = data;
    });
  }

  addView() {}

  onMetadata(e, video) {
    console.log('metadata: ', e);
    console.log('duration: ', video.duration);

    video.onplay = () => {
      console.log('played');
      console.log('duration: ', video.currentTime);
    };

    video.onpause = () => {
      console.log('paused');
    };
  }
}
