import { AlertService } from './services/alert.service';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {NgForm} from '@angular/forms';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  message: any;
  appTitle: string;
  private subscription: Subscription;
  
  actions = ["Register Patient", "Rooms", "Treatment Machines", "Doctors", "Consultations"];

  constructor(private _router: Router, private alertService: AlertService) {
    this.appTitle = 'Hospital';
    this.subscription = alertService.getMessage().subscribe(message => { this.message = message; });
    
  }
}
