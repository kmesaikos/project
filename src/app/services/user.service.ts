import { Patient } from './../../models/patient.model';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class UserService {
    constructor(private http: Http) {}

create (patient: Patient){
    return this.http.post('/api/patients', patient).map((response: Response) => response.json());
}

getAll(){
    return this.http.get('/api/patients').map((response: Response) => response.json());
}

// private jwt() {
//     // create authorization header with jwt token
//     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser && currentUser.token) {
//         let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
//         return new RequestOptions({ headers: headers });
//     }

}