import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { FavComponent } from './fav/fav.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SesionComponent } from './sesion/sesion.component';

const routes: Routes = [
  {
    path: '*',
    component: ErrorComponent
  },
  {
    path: 'fav',
    component: FavComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'sesion',
    component: SesionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
