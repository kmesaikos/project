import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // array in local storage for registered patients
    let patients: any[] = JSON.parse(localStorage.getItem('patients')) || [];
    let consultations: any[] = JSON.parse(localStorage.getItem('consultations')) || [];
    

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // create patient
            if (connection.request.url.endsWith('/api/patients') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let newPatient = JSON.parse(connection.request.getBody());

                // validation
                let duplicatePatient = patients.filter(patient => { return patient.firstName === newPatient.firstName; }).length;
                if (duplicatePatient) {
                    return connection.mockError(new Error('firstName "' + newPatient.firstName + '" already exists'));
                }

                // save new patient
                newPatient.id = patients.length + 1;
                patients.push(newPatient);
                localStorage.setItem('patients', JSON.stringify(patients));

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

              // create consultation
              if (connection.request.url.endsWith('/api/consultations') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let newConsultation = JSON.parse(connection.request.getBody());
                // save new consultation
                newConsultation.id = consultations.length + 1;
                consultations.push(newConsultation);
                localStorage.setItem('consultations', JSON.stringify(consultations));
                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                return;
            }

            // get patients
            if (connection.request.url.endsWith('/api/patients') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: patients })));

                return;
            }

            if (connection.request.url.endsWith('/api/consultations') && connection.request.method === RequestMethod.Get) {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: consultations })));
            }

            //delete patient
            if (connection.request.url.match(/\/api\/patients\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                let urlParts = connection.request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                for (let i = 0; i < patients.length; i++) {
                    let patient = patients[i];
                    if (patient.id === id) {
                        patients.splice(i, 1);
                        localStorage.setItem('patients', JSON.stringify(patients));
                        break;
                    }
                }

                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
            }

            // get user by id
            if (connection.request.url.match(/\/api\/patients\/\d+$/) && connection.request.method === RequestMethod.Get) {
                // find user by id in users array
                let urlParts = connection.request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let matchedPatients = patients.filter(patient => { return patient.id === id; });
                let patient = matchedPatients.length ? matchedPatients[0] : null;

                // respond 200 OK with user
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: patient })));
                // return 401 not authorised if token is null or invalid

                return;
            }

            // //pass through any requests not handled above
            // let realHttp = new Http(realBackend, options);
            // let requestOptions = new RequestOptions({
            //     method: connection.request.method,
            //     headers: connection.request.headers,
            //     body: connection.request.getBody(),
            //     url: connection.request.url,
            //     withCredentials: connection.request.withCredentials,
            //     responseType: connection.request.responseType
            // });
            // realHttp.request(connection.request.url, requestOptions)
            //     .subscribe((response: Response) => {
            //         connection.mockRespond(response);
            //     },
            //     (error: any) => {
            //         connection.mockError(error);
            //     });

        }, 500);

    });

    return new Http(backend, options);
};

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};