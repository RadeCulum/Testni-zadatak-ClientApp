import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.css']
})
export class CityInputComponent implements OnInit {

  inputTextValue = '';
  constructor(private userService: WeatherService) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.inputTextValue);
    console.log(this.userService.addCity(this.inputTextValue));
  }

}

