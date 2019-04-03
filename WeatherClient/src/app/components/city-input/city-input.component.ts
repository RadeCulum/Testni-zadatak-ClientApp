import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.css']
})
export class CityInputComponent implements OnInit {
  inputTextValue = '';
  cityExistError = false;
  cityDoesntExistError = false;
  citySuccessMessage = false;
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.inputMessage.subscribe(message => {
      if (message) {
        this.cityDoesntExistError = message;
      } else {
        this.citySuccessMessage = true;
        setTimeout(() => {
          this.citySuccessMessage = false;
        }, 5000);
      }
    });
  }

  async submit() {
    this.cityDoesntExistError = false;
    this.cityExistError = this.weatherService.doesItExistInTable(
      this.inputTextValue
    );
    if (!this.cityExistError) {
      this.weatherService.addCity(this.inputTextValue);
    }
  }
}
