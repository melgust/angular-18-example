import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Global } from './global.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);

  constructor() { }

  signup(data: any) {
    return this.httpClient.post(`${Global.url}/user/register`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${Global.url}/user/login`, data)
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify(result));
      }));
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

  loginData(): any {
    let data: any = localStorage.getItem('authUser');
    return JSON.parse(data);
  }
  
}
