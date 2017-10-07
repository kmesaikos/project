import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // array in local storage for registered patients
    let patients: any[] = JSON.parse(localStorage.getItem('patients')) || [];

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // authenticate
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());

                // find if any patient matches login credentials
                let filteredpatients = patients.filter(patient => {
                    return patient.patientname === params.patientname && patient.password === params.password;
                });

                if (filteredpatients.length) {
                    // if login details are valid return 200 OK with patient details and fake jwt token
                    let patient = filteredpatients[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            id: patient.id,
                            patientname: patient.patientname,
                            firstName: patient.firstName,
                            lastName: patient.lastName,
                            token: 'fake-jwt-token'
                        }
                    })));
                } else {
                    // else return 400 bad request
                    connection.mockError(new Error('patientname or password is incorrect'));
                }

                return;
            }

            // get patients
            if (connection.request.url.endsWith('/api/patients') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return patients if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: patients })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // get patient by id
            if (connection.request.url.match(/\/api\/patients\/\d+$/) && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return patient if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find patient by id in patients array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedpatients = patients.filter(patient => { return patient.id === id; });
                    let patient = matchedpatients.length ? matchedpatients[0] : null;

                    // respond 200 OK with patient
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: patient })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // create patient
            if (connection.request.url.endsWith('/api/patients') && connection.request.method === RequestMethod.Post) {
                // get new patient object from post body
                let newpatient = JSON.parse(connection.request.getBody());

                // validation
                let duplicatepatient = patients.filter(patient => { return patient.patientname === newpatient.patientname; }).length;
                if (duplicatepatient) {
                    return connection.mockError(new Error('patientname "' + newpatient.patientname + '" is already taken'));
                }

                // save new patient
                newpatient.id = patients.length + 1;
                patients.push(newpatient);
                localStorage.setItem('patients', JSON.stringify(patients));

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // delete patient
            if (connection.request.url.match(/\/api\/patients\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return patient if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find patient by id in patients array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < patients.length; i++) {
                        let patient = patients[i];
                        if (patient.id === id) {
                            // delete patient
                            patients.splice(i, 1);
                            localStorage.setItem('patients', JSON.stringify(patients));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // pass through any requests not handled above
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