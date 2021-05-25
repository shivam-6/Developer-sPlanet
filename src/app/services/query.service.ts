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

  getById(id) {
    return this.http.get(this.url + '/getbyid/' + id);
  }

  getByDeveloper(id) {
    return this.http.get(this.url + '/getbydev/' + id);
  }

  deleteQuery(id) {
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

  updateSolutions(id, sol_id) {
    return this.http.put(this.url + '/pushupdate/' + id, { solutions: sol_id });
  }

  updateUpvotes(id, sol_id) {
    return this.http.put(this.url + '/pushupdate/' + id, { upvotes: sol_id });
  }

  updateComments(id, sol_id) {
    return this.http.put(this.url + '/pushupdate/' + id, { comments: sol_id });
  }
}

