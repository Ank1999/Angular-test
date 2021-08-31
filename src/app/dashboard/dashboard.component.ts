import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { DeleteComponent } from '../delete/delete.component';
import { SharedService } from '../shared.service';
import { UpdateComponent } from '../update/update.component';
import { SelectService } from './select.service';
import { SelectModel } from './selectservice.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allData: any;

  constructor(private service: SharedService, public dialog: MatDialog) {}

  displayedColumns: string[] = ['sr_no', 'fullname', 'email', 'edit', 'delete'];

  // @ViewChild(MatPaginator, { static: false })
  // set paginator(value: MatPaginator) {
  //   this.allData.paginator = value;
  // }

  ngOnInit(): void {
    this.SelectData();
    // this.allData.paginator = this.paginator;
  }

  public SelectData() {
    this.service.userSelect().subscribe(
      (res) => {
        console.log(res.body);
        const selectData: SelectService = res.body;
        this.allData = selectData.data;
        console.log('Rulelist' + this.allData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred.
          console.log(' An error occurred:', err.error.message);
        } else {
          // Backend returns unsuccessful response codes such as 404, 500 etc
          console.log(' Backend returned status code: ', err.status);
          console.log(' Response body:', err.error);
        }
      }
    );
  }

  openDialog(action: any, obj: any, element: any) {
    const dialogConfig = new MatDialogConfig();
    obj.data = element;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = obj;

    let dialogRef;
    if (action === 'Add') {
      dialogRef = this.dialog.open(AddComponent, dialogConfig);
    }
    if (action === 'Update') {
      dialogRef = this.dialog.open(UpdateComponent, dialogConfig);
    }
    if (action === 'Delete') {
      dialogRef = this.dialog.open(DeleteComponent, dialogConfig);
      // }
      // this.dialog.open(AddComponent, dialogConfig);
      // this.dialog.open(UpdateComponent, dialogConfig);
      // this.dialog.open(DeleteComponent, dialogConfig);
    }
  }
}
