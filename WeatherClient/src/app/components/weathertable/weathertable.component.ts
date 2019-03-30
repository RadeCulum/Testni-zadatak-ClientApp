import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../models/weather.model';
import { DataSource } from '@angular/cdk/collections';
import {MatTableModule, MatSort} from '@angular/material';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'weathertable',
  templateUrl: './weathertable.component.html',
  styleUrls: ['./weathertable.component.css']
})

export class WeathertableComponent implements OnInit {
  constructor(private userService: WeatherService) { }

// tslint:disable-next-line: no-use-before-declare
  dataSource = new UserDataSource(this.userService);
  displayedColumns: string[] = ['city', 'temperature', 'description'];

  ngOnInit() {
  }

}

export class UserDataSource extends DataSource<any>{
  constructor(private userService: WeatherService) {
    super();
  }

  connect(): Observable<Weather[]> {
    return this.userService.getWeather();
  }

  disconnect(){ }

}
