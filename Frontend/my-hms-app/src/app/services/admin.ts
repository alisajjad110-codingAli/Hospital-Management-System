import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DoctorResponseDto, OnboardDoctorRequestDto, PatientResponseDto } from "../models/models";



@Injectable({ providedIn: 'root' })
export class Admin {

    private adminURL = "http://localhost:8080/api/v1/admin";
    constructor(private http: HttpClient) {}

    public getPatientsLists() : Observable<PatientResponseDto[]> {
        return this.http.get<PatientResponseDto[]>(`${this.adminURL}/patients`);
    }

    public onboardDoctor(dto: OnboardDoctorRequestDto): Observable<DoctorResponseDto> {
    return this.http.post<DoctorResponseDto>(`${this.adminURL}/onboard`, dto);
  }
}