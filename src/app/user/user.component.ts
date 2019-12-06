import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "./user.service";
import { merge, Observable, of as observableOf } from "rxjs";
import { Users } from "./users";
import { MatPaginator, MatDialog } from "@angular/material";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { DeleteDialogueComponent } from "../delete-dialogue/delete-dialogue.component";
import { NewUserComponent } from './new-user/new-user.component';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "telephoneNumbers",
    "emailAddresses",
    "action"
  ];

  users: Observable<Users[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  resultsLength = 0;

  constructor(
    private userService: UserService, 
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
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

  createOrEdit(id?: number) {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: "800px",
      data: { id }
    });

    dialogRef.afterClosed().subscribe(reason => {
      if (!id && reason) {
        this.userService.post(reason).subscribe(value => {
          this.getAll();
        });
      }

      if (id && reason) {
        this.userService.put(reason).subscribe(value => {
          this.getAll();
        });
      }
    });
  }

  requestDelete(id: number) {
    this.dialog
      .open(DeleteDialogueComponent, {
        width: "550px",
        disableClose: true,
        data: {
          title: "Delete Entry",
          text: "Are you sure you want to delete this entry?"
        }
      })
      .afterClosed()
      .subscribe(val => {
        if (val) {
          this.deleteEntry(id);
        }
      });
  }

  private deleteEntry(id: number) {
    this.userService.delete(id).subscribe(() => {
      this.getAll();
    });
  }
}
