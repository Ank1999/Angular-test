import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
 
  updateForm = this.formBuilder.group({
    full_name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    user_id: ['', Validators.required],
  });

  updateData: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: SharedService,
    private dialogRef: MatDialogRef<UpdateComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data = data.data;
  }

  ngOnInit(): void {
    this.updateForm.setValue({
      full_name: this.data.full_name,
      email: this.data.email,
      user_id: this.data.user_id,
    });
    console.log(this.updateForm.value);

    //  this.updateForm.controls.user_id.setValue(this.user_id);
  }

  get f() {
    return this.updateForm.controls;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.updateForm.controls[controlName].hasError(errorName);
  };

  public updateUser() {
    this.service.userUpdate(this.updateForm.value).subscribe(
      (res) => {
        console.log(res.body);
        // alert("User data Updated succesfully")
        if (res.body.status == 'success') {
          this.router.navigate(['/dash']);
          window.location.reload();
          this.dialogRef.close({
            event: 'Update',
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
    this.updateUser();
  }
}
