import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as SimpleMDE from 'simplemde';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-query',
  templateUrl: './create-query.component.html',
  styleUrls: ['./create-query.component.css'],
})
export class CreateQueryComponent implements OnInit {
  simplemde;
  queryform;
  querytext;
  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.simplemde = new SimpleMDE({ element: document.getElementById('md') });
    this.initQueryForm();
  }

  initQueryForm() {
    this.queryform = this.fb.group({
      title: '',
      query: '',
      developer: this.userService.currentUser._id,
      community: 'random',
      created: new Date(),
    });
  }
}
