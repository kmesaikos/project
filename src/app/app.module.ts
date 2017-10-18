import { ConsultationPageComponent } from './consultation/consultation-page.component';
import { fakeBackendProvider } from './helpers/fake.backend';
import { MockBackend } from '@angular/http/testing';
import { RegisteredPatients } from './patients/registered-patients';
import { AlertService } from './services/alert.service';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { PatientService } from './services/patient.service';
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
    PatientService,
    AlertService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],

  declarations: [
    AppComponent,
    RegisterPatientComponent,
    RegisteredPatients,
    ConsultationPageComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
