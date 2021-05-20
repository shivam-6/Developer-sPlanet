import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { QueryService } from '../services/query.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-query-details',
  templateUrl: './query-details.component.html',
  styleUrls: ['./query-details.component.css'],
})
export class QueryDetailsComponent implements OnInit {
  queryData;
  loading = true;
  constructor(
    private actRoute: ActivatedRoute,
    private queryService: QueryService,
    private router: Router,
    private commentService: CommentService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.queryService.getById(id).subscribe((data) => {
      console.log(data);
      this.queryData = data;
      this.loading = false;
    });
  }

  addSolution() {
    sessionStorage.setItem('query_to_answer', JSON.stringify(this.queryData));
    this.router.navigate(['/user/addsolution']);
  }

  addComment(comment) {
    let formdata = this.fb.group({
      text: comment,
      user: this.userService.currentUser._id,
    }).value;

    this.commentService.addComment(formdata).subscribe((res) => {
      console.log(res);
    });
  }
}
