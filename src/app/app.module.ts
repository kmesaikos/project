import { AppRoutingModule } from './app-routing.module';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    RegisterPatientComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
