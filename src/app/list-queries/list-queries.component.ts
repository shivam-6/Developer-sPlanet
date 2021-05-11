import { Component, OnInit } from '@angular/core';
import { app_config } from 'src/config';
import { QueryService } from '../services/query.service';

@Component({
  selector: 'app-list-queries',
  templateUrl: './list-queries.component.html',
  styleUrls: ['./list-queries.component.css'],
})
export class ListQueriesComponent implements OnInit {
  queryList;

  url = app_config.api_url + '/';
  constructor(private queryService: QueryService) {}

  ngOnInit(): void {
    this.fetchQueries();
  }

  fetchQueries() {
    this.queryService.getAll().subscribe((data) => {
      console.log(data);
      this.queryList = data;
    });
  }
}
