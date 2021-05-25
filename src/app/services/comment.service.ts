import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { app_config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  url = app_config.api_url + '/comment';

  constructor(private http: HttpClient, private router: Router) {}

  addComment(formdata) {
    return this.http.post(this.url + '/add', formdata);
  }

  getById(id) {
    return this.http.get(this.url + '/getbyid/' + id);
  }

  deleteComment(id) {
    return this.http.delete(this.url + '/delete/' + id);
  }
}


