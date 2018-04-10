import { RegisteredPatients } from './../patients/registered-patients';
import { ConsultationService } from './../services/consultation.service';
import { Observable } from 'rxjs/Observable';
import { RegisteredPatient } from './../models/registered-patient';
import { Condition } from './../models/condition';
import { Patient } from './../models/patient.model';
import { PatientService } from './../services/patient.service';
import { Consultation } from './../models/consultations';
import { Component, Injectable, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
    selector: 'consultation-page',
    templateUrl: './consultation-page.component.html'
})

@Injectable()
export class ConsultationPageComponent {

    patients: Patient[];
    registredPatients: Array<RegisteredPatient>;
    datesMap = {};
    dates: any;
    selectedDate: string;
    
    condition: Condition;
    patientConsultations: Array<any>;
    consultations: Array<Consultation>;
    consultationDetails = {
        patientImage: 'http://placehold.it/100x100',
        doctor: {},
        room: {},
        machine: {}
    };

    constructor(
        private patientService: PatientService,
        private consultationService: ConsultationService
    )
    { }

    ngOnInit() {
        this.fetchData().then(() => {
            this.consultations = this.sortConsultations(this.consultations);
            this.patientConsultations = this.mapConsultationToPatients(this.consultations);
            this.datesMap = this.mapDates(this.datesMap);
            this.dates = Object.keys(this.datesMap);

        })
    }

    async fetchData() {
        await  this.loadAllPatients();
        await this.getConsultations();
    }

    private loadAllPatients() {
        this.patientService.getAllPatients().subscribe(patients => { this.patients = patients; });
    }

      async setDetails(consultation: Consultation, patient: RegisteredPatient) {
        this.getImage(patient.imageId).then((imageUrl) => {
          if (imageUrl) {
            this.consultationDetails.patientImage = imageUrl;
          }
        });
    
        const doctor = await this.getDoctor(consultation.doctorId)
        if (doctor) {
          this.getImage(doctor.imageId).then((doctorImageUrl) => {
            if (doctorImageUrl) {
              doctor.imageUrl = doctorImageUrl;
            }
            this.consultationDetails.doctor = doctor;
          });
        }
    
        const room = await this.getRoom(consultation.roomId)
        this.consultationDetails.room = room;
    
        this.getMachine(room.treatmentMachineId).then((machine) => {
          this.consultationDetails.machine = machine;
        });
      }
    
      handleDetails(event: any): void {
        this.setDetails(event.consultation, event.patient);
      }
    
      getPatient(id: string): RegisteredPatient {
        const patient = this.patients.find(element => element.id === id);
        return patient;
      }
    
      private async getConsultations(): Promise<Consultation[]> {
        try {
          const consultations: Array<Consultation> = await this.consultationService.getAll<Consultation>();
          return consultations;
        } catch (err) {
          console.error(`${err.status} ${err.statusText}`);
        }
        return null;
      }
    
      private async getDoctor(id: string): Promise<any> {
        try {
          const doctor = await this.doctorService.get<any>(id);
          return doctor;
        } catch (err) {
          console.error(`${err.status} ${err.statusText}`);
        }
        return null;
      }
    
      private async getMachine(machineId: any): Promise<any> {
        try {
          const machine = await this.machineService.get<any>(machineId);
          return machine;
        } catch (err) {
          console.error(`${err.status} ${err.statusText}`);
        }
        return null;
      }
    
      private async getPatients():  Observable<RegisteredPatient[]> {
        try {
          const patients: Array<RegisteredPatient> = await this.patientService.getAllPatients();
          return patients;
        } catch (err) {
          console.error(`${err.status} ${err.statusText}`);
        }
        return null;
      }
    
    //   private async getImage(id: string): Promise<string> {
    //     try {
    //       const image: PatientImage = await this.imageService.get<PatientImage>(id);
    //       return image.url;
    //     } catch (err) {
    //       console.error(`${err.status} ${err.statusText}`);
    //     }
    //     return null;
    //   }
    
      private async getRoom(id: string): Promise<any> {
        try {
          const room = await this.roomService.get<any>(id);
          return room;
        } catch (err) {
          console.error(`${err.status} ${err.statusText}`);
        }
        return null;
      }
    
      private sortConsultations(consultations: Array<Consultation>): Array<Consultation> {
        return consultations.sort((a: any, b: any): any => {
          return a.consultationDate > b.consultationDate;
        });
      }
    
      private mapConsultationsToPatients(consultations: Array<Consultation>) {//: Promise<any> {
        return consultations.map((element: Consultation) => {
          const patient = this.getPatient(element.patientId);
          return {
            consultation: element,
            patient: patient
    
          };
        });
      }
    
      private mapDates(datesMap: any) {
        // for (let cp of this.patientConsultations) {
        for (let c of this.consultations) {
          // const c = cp.consultation; 
          const d: string = new Date(c.consultationDate).toLocaleDateString();
    
          if (!datesMap[d]) {
            datesMap[d] = [];
          }
    
          datesMap[d].push(c);
        }
        return datesMap;
      }
    }
    