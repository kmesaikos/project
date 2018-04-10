import { Consultation } from './../models/consultations';
import { Observable } from 'rxjs/Observable';
import { Patient } from './../models/patient.model';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PatientService {
    constructor(private http: Http) { }

    create(patient: Patient) {
        return this.http.post('/api/patients', patient).map((response: Response) => response.json());
    }
    
    createConsultation(consultation: Consultation) {
        return this.http.post('/api/consultations', consultation).map((response: Response) => response.json());
    }

    getAllPatients(): Observable<Patient[]> {
        return this.http.get('/api/patients')
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || "Server error"));
    }

    getAllConsultations(): Observable<Consultation[]> {
        return this.http.get('/api/consultations')
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || "server error"));
    }

    getPatientById(id:number): Observable<Patient[]> {
        return this.http.get('/api/patients/' + id)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || "error"));
    }

    deletePatient(id: number): Observable<Patient[]> {
        return this.http.delete('/api/patients/' + id)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || "error"));
    }
}