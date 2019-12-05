import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { merge, Observable, of as observableOf } from "rxjs";import { Users } from './users';
import { MatPaginator } from '@angular/material';
import { catchError, map, startWith, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = [
    "name",
    "telephoneNumbers",
    "emailAddresses",
    "action"
  ];

  users:Observable<Users[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  resultsLength = 0;

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.users = merge(this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        //this.isLoadingResults = true;
        return this.userService.getAll(
          this.paginator.pageIndex,
          this.paginator.pageSize
        );
      }),
      map(data => {
        // Flip flag to show that loading has finished.
       // this.isLoadingResults = false;
        this.resultsLength = data.totalElements;

        return data.content;
      }),
      catchError(() => {
       // this.isLoadingResults = false;
        return observableOf([]);
      })
    );
  }

}
