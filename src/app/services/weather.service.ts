import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  //api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
  apiKey: string = '5b4a5fb7fff1a8f5a3c0cd68dc4e9a5b'

  constructor(private _http: HttpClient) { }

  getWeatherData(cityId: string): Observable<any> {
    let id = cityId;
    return this._http.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${this.apiKey}`
      )
  }
}
