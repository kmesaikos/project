import { HttpBaseService } from './http-base.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConsultationService extends HttpBaseService {

    constructor(http: Http) {
        super(http, 'consultations');
    }
}