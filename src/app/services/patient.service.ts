import { Patient } from './../../models/patient.model';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PatientService {
    constructor(private http: Http) { }

    create(patient: Patient) {
        return this.http.post('/api/patients', patient).map((response: Response) => response.json());
    }

    getAll() {
        return this.http.get('/api/patients').map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/patients/' + id).map((response: Response) => response.json());
    }
}