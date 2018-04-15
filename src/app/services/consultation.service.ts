import { Observable } from 'rxjs/Observable';
import { Consultation } from './../models/consultations';
import { HttpBaseService } from './http-base.service';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class ConsultationService {

    constructor(private http: Http) { }

    create(consultation: Consultation) {
        return this.http.post('/api/consultations', consultation).map((response: Response) => response.json());
    }

    getAll(): Observable<Consultation[]> {
        return this.http.get('/api/consultations')
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || "server error"));
    }
}