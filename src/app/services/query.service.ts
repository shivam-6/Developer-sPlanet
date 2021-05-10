import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { app_config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  url = app_config.api_url + '/query';

  constructor(private http: HttpClient, private router: Router) {}

  addQuery(data: any) {
    return this.http.post(this.url + '/add', data);
  }

  getUserByEmail(email: String) {
    return this.http.get(this.url + '/getbyemail/' + email);
  }

  deleteUser(id) {
    return this.http.delete(this.url + '/delete/' + id);
  }

  getAll() {
    return this.http.get(this.url + '/getall');
  }

  update(id: String, data: Object) {
    return this.http.put(this.url + '/update/' + id, data);
  }

  uploadImage(file: any) {
    return this.http.post(app_config.api_url + '/util/addfile', file);
  }
}
