import { RegisteredPatients } from './../patients/registered-patients';
import { ConsultationService } from './../services/consultation.service';
import { Observable } from 'rxjs/Observable';
import { RegisteredPatient } from './../models/registered-patient';
import { Condition } from './../models/condition';
import { Patient } from './../models/patient.model';
import { PatientService } from './../services/patient.service';
import { Consultation } from './../models/consultations';
import { Component, Injectable, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'consultation-page',
  templateUrl: './consultation-page.component.html'
})

@Injectable()
export class ConsultationPageComponent {


  consultations: Consultation[] = [];

  constructor(
    private patientService: PatientService) { }

  ngOnInit() {
    this.loadAllConsulations();
  }

  private loadAllConsulations(): any {
    this.patientService.getAllConsultations().subscribe(consultations => (this.consultations = consultations))
    console.log(this.consultations);
  }

}
