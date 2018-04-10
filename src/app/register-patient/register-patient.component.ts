import { AlertService } from './../services/alert.service';
import { Router } from '@angular/router';
import { PatientService } from './../services/patient.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { NgModule, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Condition } from "../models/condition";
import { Patient } from "../models/patient.model";

@Component({
  selector: 'register-patient',
  templateUrl: './register-patient.component.html'
})

@Injectable()
export class RegisterPatientComponent {
  patient: any = {};
  consultation: any = {};
  loading = false;
  @Output() submitPatient = new EventEmitter<Patient>();

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
    private patientService: PatientService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOninit() {
    this.createConsultation();
  }
  
  registerPatient() {
    this.loading = true;
    this.submitPatient.emit(this.patient);

    this.patientService.create(this.patient)
      .subscribe(
      data => {
        this.alertService.success('Registration Successful!!', true);
        this.router.navigate(['/patients']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
      )
  }

  createConsultation() {
    this.patientService.createConsultation(this.consultation)
    .subscribe(
      data => {
        this.router.navigate(['/consultations']);
      },
      error => {
        this.alertService.error(error);
      }
      )
  }}