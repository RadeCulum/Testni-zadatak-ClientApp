import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Weather } from '../models/weather.model';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private getWeatherURL = 'http://localhost:3000/api/cities';
  private addCitiURL = 'http://localhost:3000/api/city/add';
  private cities = [];

  private inputMessageSource = new Subject<any>();
  inputMessage = this.inputMessageSource.asObservable();

  private inputDialogMessage = new Subject<any>();
  dialogMessage = this.inputDialogMessage.asObservable();

  private inputLoaderMessage = new Subject<any>();
  loaderMessage = this.inputLoaderMessage.asObservable();

  constructor(private http: HttpClient) {}

  getWeather(): Observable<Weather[]> {
    const result = this.http.get(this.getWeatherURL);
    result.subscribe((res: Response) => {
      let i = 0;
      while (res[i]) {
        this.cities.push(res[i]);
        i++;
      }
      console.log('Mozes prastati');
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
        },
        (err: HttpErrorResponse) => {
          if (err) {
            console.log('Grad ne postoji' + err);
            this.inputMessageSource.next(true);
          } else {
            console.log('Nema errora');
            this.inputMessageSource.next(false);
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
    console.log('Grad postoji ' + res);
    return res;
  }

  prepareDialog(city) {
    this.cities.forEach(element => {
      // console.log(element.city);
      if ((city + '').toLowerCase() === (element.city + '').toLowerCase()) {
        // console.log('NAOSAO SAM GA');
        this.inputDialogMessage.next(element);
      }
    });
  }
}
