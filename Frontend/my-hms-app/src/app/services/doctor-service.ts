import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnboardDoctorRequestDto, DoctorResponseDto } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/public';

  getAllDoctors(): Observable<DoctorResponseDto[]> {
    return this.http.get<DoctorResponseDto[]>(`${this.apiUrl}/doctors`);
  }
}