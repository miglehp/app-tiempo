import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  username: string = '';
  password: string = '';

  ngOnInit(): void {
    this.loginCheck();
  }

  loginCheck() {
    if ( this.loginService.isLoggedIn() ) {
      this.router.navigate(['/']);
    }
  }

  clickLogin() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.loginCorrecto();
    } else {
      this.loginFallido();
    }
  }

  loginCorrecto() {
    localStorage.setItem('login', 'correcto');
    this.router.navigate(['/']);
  }

  loginFallido() {
    console.log('inicio de sesion fallido');
  }
}
