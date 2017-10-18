import { Consultation } from './../../models/consultations';
import { Component, Injectable, OnInit } from '@angular/core';


@Component({
    selector: 'consultation-page',
    templateUrl: './consultation-page.component.html'
})

@Injectable()
export class ConsultationPageComponent implements OnInit{
    datesMap = {};
    dates: any;
    
    consultations: Array<Consultation>;

    constructor() { }

    ngOnInit(): void {
        this.dates = Object.keys(this.datesMap);
    }
}