import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  userSelect() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let body = new URLSearchParams();
    // body.set();
    // body.set('password', login.password);
    return this.http.post<any>(
      'https://ankit06-angular.000webhostapp.com/api/select.php',
      body.toString(),
      {
        headers: httpHeaders,
        observe: 'response',
      }
    );
  }

  userAdd(add: any) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let body = new URLSearchParams();
    body.set('full_name', add.full_name);
    body.set('email', add.email);
    return this.http.post<any>(
      'https://ankit06-angular.000webhostapp.com/api/insert.php',
      body.toString(),
      {
        headers: httpHeaders,
        observe: 'response',
      }
    );
  }

  userUpdate(update: any) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let body = new URLSearchParams();
    body.set('user_id', update.user_id);
    body.set('full_name', update.full_name);
    body.set('email', update.email);
    return this.http.post<any>(
      'https://ankit06-angular.000webhostapp.com/api/update.php',
      body.toString(),
      {
        headers: httpHeaders,
        observe: 'response',
      }
    );
  }

  userDelete(user_id : any) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let body = new URLSearchParams();
    body.set('user_id', user_id);
    return this.http.post<any>(
      'https://ankit06-angular.000webhostapp.com/api/delete.php',
      body.toString(),
      {
        headers: httpHeaders,
        observe: 'response',
      }
    );
  }
  
}
