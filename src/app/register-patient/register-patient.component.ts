import { AlertService } from './../services/alert.service';
import { Condition } from './../../models/condition';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Patient } from './../../models/patient.model';
import { Component, Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'register-patient',
  templateUrl: './register-patient.component.html'
})

@Injectable()
export class RegisterPatientComponent {
  patient: any = {};
  loading = false;

  conditions: Array<Condition> = [
    {
      text: 'Breast Cancer',
      type: 'breastcancer'
    },
    {
      text: 'Head & Neck Cancer',
      type: 'headandneckcancer'
    },
    {
      text: 'Flu',
      type: 'flu'
    }
  ];
  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) { }

  register() {
    this.loading = true;
    this.userService.create(this.patient)
      .subscribe(
      data => {
        this.alertService.success('registration Successful', true);
        this.router.navigate(['/patients']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
      )
  }
}
