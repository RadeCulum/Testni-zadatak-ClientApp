import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Weather } from '../models/weather.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private getWeatherURL = 'http://localhost:3000/api/cities';
  private addCitiURL = 'http://localhost:3000/api/add';

  constructor(private http: HttpClient) { }

  getWeather(): Observable<Weather[]> {
    return this.http.get<Weather[]>(this.getWeatherURL);
  }

  addCity(cityName) {
    console.log('Dodajem ' + cityName + this.addCitiURL);

    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    let body = new HttpParams();
    body = body.set('city', cityName);

    this.http.post(this.addCitiURL, body).subscribe((res: any[]) => {
      console.log(res);
    });
    return 2;
  }
}
