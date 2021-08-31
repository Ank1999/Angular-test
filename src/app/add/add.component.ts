import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  addForm = this.formBuilder.group({
    full_name: ['', Validators.required],
    email: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private service: SharedService,
    private dialogRef: MatDialogRef<AddComponent>,
    private router: Router
  ) {}

  get f() {
    return this.addForm.controls;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.addForm.controls[controlName].hasError(errorName);
  };

  ngOnInit(): void {}

  public addUser() {
    this.service.userAdd(this.addForm.value).subscribe(
      (res) => {
        console.log(res.body);
        if (res.body.status == 'success') {
          this.router.navigate(['/dash']);
          window.location.reload();
          this.dialogRef.close({
            event: 'Added',
            isUpdated: true,
          });
        }
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

  onSubmit() {
    this.addUser();
  }
}
