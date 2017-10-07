import { RegisteredPatients } from './patients/registered-patients';
import { AlertService } from './services/alert.service';
import { HttpModule } from '@angular/http';
import { UserService } from './services/user.service';
import { AppRoutingModule } from './app-routing.module';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule  ,
    ReactiveFormsModule,
    HttpModule
                              
  ],
  providers: [
    UserService,
    AlertService
  ],

  declarations: [
    AppComponent,
    RegisterPatientComponent,
    RegisteredPatients
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
