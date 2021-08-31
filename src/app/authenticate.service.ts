import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private http: HttpClient) {}

  login(login: any) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let body = new URLSearchParams();
    body.set('email', login.username);
    body.set('password', login.password);
    return this.http.post<any>(
      'https://ankit06-angular.000webhostapp.com/api/login.php',
      body.toString(),
      {
        headers: httpHeaders,
        observe: 'response',
      }
    );
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('currentUser');
  }
}
