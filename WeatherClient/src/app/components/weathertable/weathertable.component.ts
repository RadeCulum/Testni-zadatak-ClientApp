import {
  Component,
  OnInit,
  AfterViewChecked
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../models/weather.model';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'weatherTableComponent',
  templateUrl: './weathertable.component.html',
  styleUrls: ['./weathertable.component.css']
})
export class WeathertableComponent implements OnInit, AfterViewChecked {
  public isLoading = true;
  public isLoadingAfter = false;

  dataSource = new WeatherDataSource(this.weatherService);
  displayedColumns: string[] = ['city', 'temperature', 'description'];

  constructor(
    private weatherService: WeatherService,
    private dialog: MatDialog,
  ) {}

  ngAfterViewChecked(): void {
    this.isLoading = this.isLoadingAfter;
  }

  ngOnInit() {
    this.weatherService.loaderMessage.subscribe(message => {
      this.isLoadingAfter = message;
    });
  }
  show(value: any) {
    this.weatherService.prepareDialog(value);
    this.dialog.open(DialogComponent);
  }
}

export class WeatherDataSource extends DataSource<any> {
  constructor(private weatherService: WeatherService) {
    super();
  }

  connect(): Observable<Weather[]> {
    return this.weatherService.getWeather();
  }

  disconnect() {}
}
