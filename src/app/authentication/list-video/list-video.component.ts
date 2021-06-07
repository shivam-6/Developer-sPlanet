import { Component, OnInit } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
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

  constructor(
    private videoService: VideoService,
    private searchService: NbSearchService
  ) {}

  ngOnInit(): void {
    this.fetchVideos();
    this.searchService.onSearchSubmit().subscribe((search: any) => {
      this.videoService.getAll().subscribe((data: any) => {
        this.videoList = data.filter((video) =>
          video.title.toLowerCase().includes(search.term.toLowerCase())
        );
        console.log(data);
        this.loading = false;
      });
    });
  }

  fetchVideos() {
    this.videoService.getAll().subscribe((data) => {
      this.videoList = data;
      this.loading = false;
      console.log(data);
    });
  }
}
