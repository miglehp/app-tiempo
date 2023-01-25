import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Ciudad } from '../model/ciudad';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  searchText: string | undefined;
  matchList: Ciudad[] | undefined;
  ciudadId: string = '';
  favArray: string[] = [];

  ngOnInit(): void {
    this.loginCheck();
    this.inicializarList();
  }

  loginCheck() {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  filterSearch() {
    this.filterCiudad(this.searchText);
  }

  async inicializarList() {
    let res = await fetch('../../assets/cities.json');
    this.matchList = await res.json();
    let favArrayString: any = localStorage.getItem('favArray');
    if (favArrayString) {
      this.favArray = JSON.parse(favArrayString);
    }
  }

  async filterCiudad(searchText: string | undefined) {
    let res = await fetch('../../assets/cities.json');
    let ciudades = await res.json();
    let matches = ciudades.filter((ciudad: Ciudad) => {
      let regex = new RegExp(`^${searchText}`, 'gi');
      return ciudad.name.match(regex);
    });

    if (searchText?.length === 0) {
      matches = [];
    }
    this.setMatchesValue(matches);
  }

  setMatchesValue(matches: Ciudad[]) {
    this.matchList = matches;
    console.log(this.matchList);
  }

  addToFav() {
    if ( this.favArray.indexOf(this.ciudadId) === -1 ) {
      this.favArray.push(this.ciudadId);
      localStorage.setItem('favArray' , JSON.stringify(this.favArray));
      console.log('se ha añadido a favoritos');
    }
  }
}
