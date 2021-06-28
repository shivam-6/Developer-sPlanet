import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as SimpleMDE from 'simplemde';
import { UserService } from '../../services/user.service';
import {
  NbTagComponent,
  NbTagInputDirective,
  NbToastrService,
} from '@nebular/theme';
import { QueryService } from '../../services/query.service';

@Component({
  selector: 'app-create-query',
  templateUrl: './create-query.component.html',
  styleUrls: ['./create-query.component.css'],
})
export class CreateQueryComponent implements OnInit {
  simplemde;
  queryform;
  querytext;
  @ViewChild(NbTagInputDirective, { read: ElementRef })
  tagInput: ElementRef<HTMLInputElement>;

  topics = [
    'Angular',
    'JavaScript',
    'React',
    'MEAN stack',
    'TypeScript',
    'Angular 11',
    'html',
    'c++'
  ];

  selTopics = ['Angular'];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private queryService: QueryService,
    private toastr: NbToastrService
  ) {}

  ngOnInit(): void {
    this.simplemde = new SimpleMDE({ element: document.getElementById('md') });
    this.initQueryForm();
  }

  initQueryForm() {
    this.queryform = this.fb.group({
      title: '',
      query: '',
      developer: this.userService.currentUser._id,
      created: new Date(),
      data: {},
      upvotes: 0,
      solutions: Array,
      comments: Array,
    });
  }

  publishQuery() {
    let formdata = this.queryform.value;
    let data = {};
    data['topics'] = this.selTopics;

    formdata.query = this.simplemde.value();
    formdata.data = data;

    this.queryService.addQuery(formdata).subscribe((res) => {
      console.log(res);
      this.toastr.success('Your Query has been posted', 'Success');
    });
  }

  onTopicRemove(tagToRemove: NbTagComponent): void {
    let index = this.selTopics.indexOf(tagToRemove.text);
    if (index > -1) {
      this.selTopics.splice(index, 1);
    }
    this.topics.push(tagToRemove.text);
  }

  onTopicAdd(value: string): void {
    if (value) {
      this.selTopics.push(value);
      this.topics = this.topics.filter((t) => t !== value);
    }
    this.tagInput.nativeElement.value = '';
  }
}
