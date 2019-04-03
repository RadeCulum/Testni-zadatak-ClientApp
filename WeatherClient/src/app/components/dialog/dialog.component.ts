import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from 'src/app/models/weather.model';

@Component({
  selector: 'app-dialog',
  template: `
  <p>Cyti: {{city}} </p>
  <p>Temperature: </p>
  <p>Description: </p>
  <p>Pressure: </p>
  <p>Wind speed:</p>
  <p>Temp. min: </p>
  <p>Temp. max: </p>
  `,
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public city: string;
  public temperature: number;
  public description: string;
  public pressure: number;
  public windSpeed: number;
  public tempMin: number;
  public tempMax: number;

  constructor(private weatherService: WeatherService) { }


  ngOnInit() {
    this.weatherService.dialogMessage.subscribe(message => {
      this.city = message.city;
      this.temperature = message.temperature;
      this.description = message.description;
      this.pressure = message.pressure;
      this.windSpeed = message.windSpeed;
      this.tempMin = message.tempMin;
      this.tempMax = message.tempMax;
      console.log(this.city);
      console.log(this.temperature);
      console.log(this.description);
      console.log(this.pressure);
      console.log(this.windSpeed);
      console.log(this.tempMin);
      console.log(this.tempMax);
    });
  }

}
