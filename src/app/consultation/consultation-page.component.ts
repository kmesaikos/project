import { RegisteredPatients } from './../patients/registered-patients';
import { ConsultationService } from './../services/consultation.service';
import { Observable } from 'rxjs/Observable';
import { RegisteredPatient } from './../models/registered-patient';
import { Condition } from './../models/condition';
import { Doctor } from './../models/doctor';
import { Patient } from './../models/patient.model';
import { PatientService } from './../services/patient.service';
import { Consultation } from './../models/consultations';
import { Component, Injectable, OnInit, Input, EventEmitter, Output } from '@angular/core';
import 'rxjs/add/observable/of';

@Component({
  selector: 'consultation-page',
  templateUrl: './consultation-page.component.html'
})

@Injectable()
export class ConsultationPageComponent {

  conditions: Condition[] = [];
  consultations: Consultation[] = [];
  doctors: Doctor[] = [
    {
    name: "Vagelis",
    role: "Phycologist"
  },
    {
      name: "Kakalos",
      role: "Pathologos"
    }
  ]; 
  constructor(
    private patientService: PatientService) { }

  ngOnInit() {
    this.loadAllConsulations();
  }

  private loadAllConsulations(): any {
    this.patientService.getAllConsultations().subscribe(conditions => (this.conditions = conditions))
  }

  private getDoctornByCondition() {
    let madOrCrazy = this.conditions.filter(c => c.type === "mad" || "crazy")
    if (madOrCrazy) {
      return this.doctors.filter(n => n.name === "Kakalos");
    };
    return this.doctors.filter(n => n.name === "Vaggelis");
  }

  getConsultations(): Consultation[]{
    return this.consultations;
  }
}

