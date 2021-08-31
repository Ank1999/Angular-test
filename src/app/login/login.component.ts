import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private authenticationService: AuthenticateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.authenticationService.logout();
  }

  login() {
    if (this.loginForm.status === 'INVALID') {
      return;
    }
   
    this.authenticationService.login(this.loginForm.value).subscribe(
      (res) => {
        if (res.body.status == 'error') {
          alert('Invalid Credentials...');
        } else {
          // localStorage.setItem('userdetails', JSON.stringify(res));
          localStorage.setItem('isLoggedin', 'true');
          this.router.navigate(['/layout/dash']);
        }
        console.log(res.body);
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

}
