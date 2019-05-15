import { Component, OnInit, Inject } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Weather } from 'src/app/models/weather.model';

@Component({
  selector: 'dialogComponent',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent implements OnInit {
  constructor(private weatherService: WeatherService,
              @Inject(MAT_DIALOG_DATA) public weather: Weather) {}

  ngOnInit() {
    this.weatherService.dialogMessage.subscribe(message => {
      this.weather = message;
    });
  }
}
