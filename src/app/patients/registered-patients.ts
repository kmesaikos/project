import { UserService } from './../services/user.service';
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

    constructor(private userService: UserService) 
    { }

    ngOnInit() {
        this.loadAllPatients();
    }

    private loadAllPatients() {
        this.userService.getAll().subscribe(patients => { this.patients = patients;});
    }
}

