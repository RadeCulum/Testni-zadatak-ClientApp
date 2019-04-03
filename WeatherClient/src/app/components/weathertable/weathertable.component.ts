import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../models/weather.model';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { timeout } from 'q';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'weathertable',
  templateUrl: './weathertable.component.html',
  styleUrls: ['./weathertable.component.css']
})
export class WeathertableComponent implements OnInit, AfterViewChecked {
  public isLoading = true;
  public isLoadingAfter = false;
  constructor(
    private weatherService: WeatherService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  // tslint:disable-next-line: no-use-before-declare
  dataSource = new WeatherDataSource(this.weatherService);
  displayedColumns: string[] = ['city', 'temperature', 'description'];

  ngAfterViewChecked(): void {
    console.log(this.isLoading + '  ' + this.isLoadingAfter);
    if (this.isLoadingAfter != this.isLoading) {
      this.isLoading = this.isLoadingAfter;
      this.cdRef.detectChanges();
    }
  }

  ngOnInit() {
    this.weatherService.loaderMessage.subscribe(message => {
      this.isLoadingAfter = message;
    });
  }
  async show(value) {
    this.weatherService.prepareDialog(value);
    setTimeout(() => {
      this.dialog.open(DialogComponent);
    }, 1000);
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
