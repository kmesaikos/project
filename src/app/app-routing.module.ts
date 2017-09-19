import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { AppComponent } from './app.component'; 

import { RouterModule, Routes } from '@angular/router';  

const appRoutes: Routes = [
    { path: 'register', component: RegisterPatientComponent },
    { path: 'home', component: AppComponent },
  ];


@NgModule ({ 
   imports: [ RouterModule.forRoot(appRoutes)],
   exports: [RouterModule]
}) 

export class AppRoutingModule {
} 