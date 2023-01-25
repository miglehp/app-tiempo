import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginKey: string | null | undefined;

  constructor(router: Router) { }

  isLoggedIn(): boolean {
  this.loginKey = localStorage.getItem('login');
    if (this.loginKey === 'correcto'){
      return true;
    } else {
      return false;
    }
  }
}
