import { JsonPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  user_id :any;
  constructor(
    private service: SharedService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
     this.user_id = data.data.user_id;
  }

  ngOnInit(): void {
    console.log(this.user_id)
  }

  remove() {
    this.service.userDelete(this.user_id).subscribe((res) => {
      const normalResponse = res.body;
      if (normalResponse.isTrue) {
      }
      if (res.body.status == "success") {
        this.router.navigate(['/layout/dash']);
        window.location.reload();
        this.dialogRef.close({
          event: 'Deleted',
          isUpdated: true
        })
      }
    });
  }
}
