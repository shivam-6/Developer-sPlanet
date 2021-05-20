import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { QueryService } from 'src/app/services/query.service';
import { UserService } from 'src/app/services/user.service';
import { app_config } from 'src/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-queries',
  templateUrl: './manage-queries.component.html',
  styleUrls: ['./manage-queries.component.css'],
})
export class ManageQueriesComponent implements OnInit {
  queryList: any;
  loadingQueries = true;
  url = app_config.api_url + '/';

  constructor(
    public userService: UserService,
    private router: Router,
    private queryService: QueryService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.fetchQueries();
  }

  fetchQueries() {
    this.queryService
      .getByDeveloper(this.userService.currentUser._id)
      .subscribe((res) => {
        this.queryList = res;
        this.loadingQueries = false;
        console.log(this.queryList);
      });
  }

  deleteQuery(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.queryService.deleteQuery(id).subscribe((res) => {
          console.log(res);
          this.toastrService.show('Query Removed', 'Deleted!', {
            status: 'info',
            icon: 'alert-circle-outline',
          });
          this.fetchQueries();
        });
      }
    });
  }

  updateQuery(id) {}
}
