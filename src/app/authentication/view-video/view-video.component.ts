import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css'],
})
export class ViewVideoComponent implements OnInit {
  videoData;
  videoList;
  loading=true;
  playtime = 0;
  countOn = 10;
  url = app_config.api_url + '/';

  constructor(
    private actRoute: ActivatedRoute,
    private videoService: VideoService,
    public userService: UserService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.fetchVideo();
    this.fetchVideos();
  }
  
  fetchVideo() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.videoService.getVideoById(id).subscribe((data) => {
      this.videoData = data;
      console.log(data);
      if (this.userService.loggedin) {
        this.addView();
      }
    });
  }

  addComment(text) {
    let formdata = {
      user: this.userService.currentUser._id,
      text: text,
      created: new Date(),
    };

    this.commentService.addComment(formdata).subscribe((data: any) => {
      this.videoService
        .updateComment(this.videoData._id, { comments: data._id })
        .subscribe((res) => {
          console.log(res);
          this.fetchVideo();
        });
    });
  }

  addLike() {
    if (this.userService.loggedin) {
      if (!this.videoData.upvotes.includes(this.userService.currentUser._id)) {
        this.videoService
          .updateUpvotes(this.videoData._id, this.userService.currentUser._id)
          .subscribe((res) => {
            this.fetchVideo();
          });
      }
    }
  }

  addView() {
    if (!this.videoData.views.includes(this.userService.currentUser._id)) {
      this.videoService
        .updateViews(this.videoData._id, this.userService.currentUser._id)
        .subscribe((res) => {
          this.fetchVideo();
        });
    }
  }

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
  fetchVideos() {
    this.videoService.getAll().subscribe((data) => {
      this.videoList = data;
      this.loading = false;
      console.log(data);
    });
  }

}
