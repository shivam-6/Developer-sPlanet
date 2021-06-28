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
  videoList = [];
  loading = true;
  playtime = 0;
  countOn = 10;
  followtext = 'Follow';
  url = app_config.api_url + '/';

  constructor(
    private actRoute: ActivatedRoute,
    private videoService: VideoService,
    public userService: UserService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.fetchVideo();
    this.fetchRecommendations(this.userService.currentUser.following);
  }

  fetchVideo() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.videoService.getVideoById(id).subscribe((data: any) => {
      this.videoData = data;
      console.log(data);
      if (this.userService.loggedin) {
        this.addView();
      }
      if (this.checkFollowing(data.developer._id)) {
        this.followtext = 'Unfollow';
      }
    });
  }

  addComment(text) {
    let formdata = {
      developer: this.userService.currentUser._id,
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

  addFollower(id) {
    if (!this.checkFollowing(id)) {
      this.userService
        .pushUpdate(this.userService.currentUser._id, { following: id })
        .subscribe((data) => {
          console.log(data);
          this.followtext = 'Unfollow';
          this.userService.refreshUser();
        });
    } else {
      this.userService
        .pullUpdate(this.userService.currentUser._id, { following: id })
        .subscribe((data) => {
          console.log(data);
          this.followtext = 'Follow';
          this.userService.refreshUser();
        });
    }
  }

  checkFollowing(id) {
    console.log(this.userService.currentUser.following);
    return this.userService.currentUser.following.includes(id);
  }

  fetchRecommendations(dev_ids) {
    for (let id of dev_ids) {
      this.videoService.getByUser(id).subscribe((data) => {
        console.log(data);
        this.videoList = this.videoList.concat(data);
        this.loading = false;
      });
    }
  }
}
