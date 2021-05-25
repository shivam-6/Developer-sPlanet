import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { app_config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  url = app_config.api_url + '/video';
  constructor(private http: HttpClient, private router: Router) {}

  addVideo(data: any) {
    return this.http.post(this.url + '/add', data);
  }

  getVideoById(id) {
    return this.http.get(this.url + '/getbyid/' + id);
  }

  getByUser(id) {
    return this.http.get(this.url + '/getbydeveloper/' + id);
  }

  deleteVideo(id) {
    return this.http.delete(this.url + '/delete/' + id);
  }

  getAll() {
    return this.http.get(this.url + '/getall');
  }

  update(id: String, data: Object) {
    return this.http.put(this.url + '/update/' + id, data);
  }

  updateComment(id, data) {
    return this.http.put(this.url + '/pushupdate/' + id, data);
  }

  updateUpvotes(id, user_id) {
    return this.http.put(this.url + '/pushupdate/' + id, { upvotes: user_id });
  }

  updateViews(id, user_id) {
    return this.http.put(this.url + '/pushupdate/' + id, { views: user_id });
  }
}
