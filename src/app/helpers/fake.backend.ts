import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // array in local storage for registered patients
    let patients: any[] = JSON.parse(localStorage.getItem('patients')) || [];

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

                // save new user
                newPatient.id = patients.length + 1;
                patients.push(newPatient);
                localStorage.setItem('patients', JSON.stringify(patients));

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // get users
            if (connection.request.url.endsWith('/api/patients') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: patients })));
              
                return;
            }


            //pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

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