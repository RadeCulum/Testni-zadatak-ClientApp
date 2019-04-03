import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  MatTableModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatCardModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { WeatherService } from './services/weather.service';
import { WeathertableComponent } from './components/weathertable/weathertable.component';
import { CityInputComponent } from './components/city-input/city-input.component';
import { DialogComponent } from './components/dialog/dialog.component';
enableProdMode();
@NgModule({
  declarations: [
    AppComponent,
    WeathertableComponent,
    CityInputComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule {}
