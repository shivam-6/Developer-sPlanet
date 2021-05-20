import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryService } from '../services/query.service';

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
    private router: Router
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
    this.router.navigate(['/addsolution']);
  }
}
