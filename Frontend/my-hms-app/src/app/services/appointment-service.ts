import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppointmentResponseDto, CreateAppointmentRequestDto } from '../models/models';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root',
})
export class AppointmentService {
    private http = inject(HttpClient);
    private baseURL = "http://localhost:8080/api/v1/appointments";

    public getAllAppointments() : Observable<AppointmentResponseDto[]> {
        return this.http.get<AppointmentResponseDto[]>(`${this.baseURL}`);
    }

    public getAppointmentsByPatientId(patientId: number): Observable<AppointmentResponseDto[]> {
        return this.http.get<AppointmentResponseDto[]>(`${this.baseURL}/patient/${patientId}`);
    }

    public createAppointment(dto: CreateAppointmentRequestDto): Observable<AppointmentResponseDto[]> {
        return this.http.post<AppointmentResponseDto[]>(`${this.baseURL}`, dto);
    }
}
