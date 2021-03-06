import { ConsultationPageComponent } from './consultation/consultation-page.component';
import { RegisteredPatients } from './patients/registered-patients';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { AppComponent } from './app.component'; 

import { RouterModule, Routes } from '@angular/router';  

const appRoutes: Routes = [
    { path: 'register', component: RegisterPatientComponent },
    { path: 'patients', component: RegisteredPatients },
    { path: 'home', component: AppComponent },
    { path: 'consultations',component: ConsultationPageComponent}
  ];


@NgModule ({ 
   imports: [ RouterModule.forRoot(appRoutes)],
   exports: [RouterModule]
}) 

export class AppRoutingModule {
} 