import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from 'src/app/services/query.service';
import { SolutionService } from 'src/app/services/solution.service';
import { UserService } from 'src/app/services/user.service';
import * as SimpleMDE from 'simplemde';
import { VideoService } from 'src/app/services/video.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-create-solution',
  templateUrl: './create-solution.component.html',
  styleUrls: ['./create-solution.component.css'],
})
export class CreateSolutionComponent implements OnInit {
  queryData;
  solForm;
  simplemde: any;
  soltext;
  videoList;
  loading = true;
  url = app_config.api_url + '/';

  constructor(
    private actRoute: ActivatedRoute,
    private solutionService: SolutionService,
    private queryService: QueryService,
    private fb: FormBuilder,
    private userService: UserService,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.queryService.getById(id).subscribe((data) => {
      console.log(data);
      this.queryData = data;
      this.fetchUserVideos();
    });
  }

  initForm() {
    this.simplemde = new SimpleMDE({ element: document.getElementById('sol') });
    this.solForm = this.fb.group({
      title: '',
      developer: this.userService.currentUser._id,
      data: {},
      upvotes: Array,
      comments: Array,
      video: '',
      created: new Date(),
    });
  }

  fetchUserVideos() {
    this.videoService
      .getByUser(this.userService.currentUser._id)
      .subscribe((data) => {
        console.log(data);
        this.videoList = data;
        this.loading = false;
        this.initForm();
      });
  }

  submitSol() {
    let formdata = this.solForm.value;
    formdata.data = this.simplemde.value();
    this.solutionService.addSolution(formdata).subscribe((res: any) => {
      console.log(res);
      this.queryService
        .updateSolutions(this.queryData._id, res._id)
        .subscribe((res) => {
          console.log(res);
        });
    });
  }
}



