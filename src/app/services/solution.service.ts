import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { app_config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class SolutionService {
  url = app_config.api_url;
  constructor(private http: HttpClient) {}

  addSolution(data) {
    return this.http.post('/add', data);
  }

  getSolutionsByQuery(id) {
    return this.http.get('/getbyquery/' + id);
  }
}
