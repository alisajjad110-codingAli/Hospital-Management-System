import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../patient';
import { AppointmentResponseDto, CreateAppointmentRequestDto } from '../models/models';

@Injectable({
    providedIn:'root'
})
export class PatientService {

    private patientURL = "http://localhost:8080/api/v1";

    constructor(private httpClient: HttpClient) {}

    public createAppointment(dto: CreateAppointmentRequestDto) : Observable<AppointmentResponseDto> {
        return this.httpClient.post<AppointmentResponseDto>(`${this.patientURL}/patients/appointments`, dto);
    }

    public getPatientById(id: number) : Observable<Patient> {
        return this.httpClient.get<Patient>(`${this.patientURL}/patients/profile`);
    }

    public updatePatient(id: number, patient: Patient) : Observable<Object> {
        return this.httpClient.put<Patient>(`${this.patientURL}/id`,patient);
    }

    public deletePatient(id: number) : Observable<Object> {
        return this.httpClient.delete<Patient>(`${this.patientURL}/id`);
    }



}
