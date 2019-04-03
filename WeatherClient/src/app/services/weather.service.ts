import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Weather } from '../models/weather.model';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private getWeatherURL = 'http://localhost:3000/api/cities';
  private addCitiURL = 'http://localhost:3000/api/city/add';
  private cities = [];

  private inputMessageSource = new Subject<any>();
  inputMessage = this.inputMessageSource.asObservable();

  private inputDialogMessage = new ReplaySubject<any>(1);
  dialogMessage = this.inputDialogMessage.asObservable();

  private inputLoaderMessage = new Subject<any>();
  loaderMessage = this.inputLoaderMessage.asObservable();

  constructor(private http: HttpClient) {}

  getWeather(): Observable<Weather[]> {
    this.inputLoaderMessage.next(true);
    const result = this.http.get(this.getWeatherURL);
    result.subscribe((res: Response) => {
      let i = 0;
      while (res[i]) {
        this.cities[i] = res[i];
        i++;
      }
      this.inputLoaderMessage.next(false);
    });
    return result as Observable<Weather[]>;
  }

  addCity(cityName) {
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

  doesItExistInTable(city) {
    let res = false;
    // tslint:disable-next-line: no-shadowed-variable
    this.cities.forEach(element => {
      if ((city + '').toLowerCase() === (element.city + '').toLowerCase()) {
        res = true;
      }
    });
    return res;
  }

  prepareDialog(weather) {
    this.inputDialogMessage.next(weather);
  }
}
