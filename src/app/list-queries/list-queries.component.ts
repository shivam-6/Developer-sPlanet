import { Component, OnInit } from '@angular/core';
import { QueryService } from '../services/query.service';

@Component({
  selector: 'app-list-queries',
  templateUrl: './list-queries.component.html',
  styleUrls: ['./list-queries.component.css'],
})
export class ListQueriesComponent implements OnInit {
  queryList;
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
