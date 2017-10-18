import { PatientService } from './../services/patient.service';
import { Patient } from './../../models/patient.model';
import { Component, Injectable } from '@angular/core';


@Component({
    selector: "registered-patients.component",
    styleUrls: ['./registered-patients.scss'],
    templateUrl: "./registered-patients.component.html"
})

@Injectable()
export class RegisteredPatients{
    
    currentPatient: Patient;
    patients: Patient[] = [];

    constructor(private patientService: PatientService) 
    { }

    ngOnInit() {
        this.loadAllPatients();
    }

    deletePatient(id: number) {
        this.patientService.delete(id).subscribe(() => {this.loadAllPatients()});

    }

    private loadAllPatients() {
        this.patientService.getAll().subscribe(patients => { this.patients = patients;});
    }
}

