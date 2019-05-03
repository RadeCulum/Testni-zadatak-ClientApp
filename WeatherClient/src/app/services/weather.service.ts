import { Injectable } from '@angular/core';

import { Weather } from '../models/weather.model';

import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  private getWeatherURL = 'http://localhost:3000/api/cities';
  private addCitiURL = 'http://localhost:3000/api/city/add';
  private cities = [];

  private inputMessageSource = new ReplaySubject<any>(1);
  inputMessage = this.inputMessageSource.asObservable();

  private dialogMessageSource = new ReplaySubject<any>(1);
  dialogMessage = this.dialogMessageSource.asObservable();

  private loaderMessageSource = new ReplaySubject<any>(1);
  loaderMessage = this.loaderMessageSource.asObservable();

  constructor(private http: HttpClient) {}

  getWeather(): Observable<Weather[]> {
    this.loaderMessageSource.next(true);
    const result = this.http.get(this.getWeatherURL);
    result.subscribe((res: Response) => {
      let i = 0;
      while (res[i]) {
        this.cities[i] = res[i];
        i++;
      }
      this.loaderMessageSource.next(false);
    });
    return result as Observable<Weather[]>;
  }

  addCity(cityName: string) {
    if (this.doesItExistInTable(cityName)) {
      this.inputMessageSource.next(true);
    } else {
      let body = new HttpParams();
      body = body.set('city', cityName);

      const response = this.http.post(this.addCitiURL, body);
      response.subscribe(
        res => {
          this.cities.push(res);
          this.inputMessageSource.next(false);
        },
        (err: HttpErrorResponse) => {
          if (err) {
            this.inputMessageSource.next(true);
          }
        }
      );
    }
  }

  doesItExistInTable(city: string) {
    let res = false;
    this.cities.forEach(element => {
      if ((city + '').toLowerCase() === (element.city + '').toLowerCase()) {
        res = true;
      }
    });
    return res;
  }

  prepareDialog(weather: any) {
    this.dialogMessageSource.next(weather);
  }
}
