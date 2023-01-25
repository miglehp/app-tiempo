import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Ciudad } from '../model/ciudad';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss'],
})
export class FavComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService, private weatherService: WeatherService) {}

  ciudadName: string = '';
  ciudadId: string = '';
  favArray: string[] = [];
  matchList: Ciudad[] | undefined;
  data: any = {
    main:{
      temp: '',
      feels_like: '',
      temp_min: '',
      temp_max: '',
    }
  };
  urlImg: string = ``;

  ngOnInit(): void {
    this.loginCheck();
    this.inicializarList();
  }

  loginCheck() {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  async inicializarList() {
    let favArrayString: any = localStorage.getItem('favArray');
    if (favArrayString) {
      this.favArray = JSON.parse(favArrayString);
    }
  }

  removeFromFav() {
    let index = this.favArray.indexOf(this.ciudadName);
    if (index > -1 ){
      this.favArray.splice(index, 1);
      console.log(this.favArray);
      localStorage.setItem('favArray', JSON.stringify(this.favArray));
      console.log('se ha eliminado de favoritos');
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
    this.ciudadId = this.matchList[0].id;
    this.weatherService.getWeatherData(this.ciudadId).subscribe((response) => {
      if (response) {
        this.data = response;
        this.urlImg = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
      }
    });;
  }

  changeCiudad(){
    this.filterCiudad(this.ciudadName);
  }
}
