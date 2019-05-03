import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'cityInputComponent',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.css']
})
export class CityInputComponent implements OnInit {
  inputTextValue = '';
  submittedValue = '';
  cityExistError = false;
  cityDoesntExistError = false;
  citySuccessMessage = false;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.inputMessage.subscribe(message => {
      if (message) {
        this.cityDoesntExistError = message;
        setTimeout(() => {
          this.cityDoesntExistError = false;
        }, 3000);
      } else {
        this.citySuccessMessage = true;
        setTimeout(() => {
          this.citySuccessMessage = false;
          window.location.reload();
        }, 800);
      }
    });
  }

  submit() {
    this.cityDoesntExistError = false;
    this.submittedValue = this.inputTextValue;
    this.cityExistError = this.weatherService.doesItExistInTable(
      this.inputTextValue
    );
    if (!this.cityExistError) {
      this.weatherService.addCity(this.inputTextValue);
    } else {
      setTimeout(() => {
        this.cityExistError = false;
      }, 3000);
    }
    this.inputTextValue = '';
  }
}
