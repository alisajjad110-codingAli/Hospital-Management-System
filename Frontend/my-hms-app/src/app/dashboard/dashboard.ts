import { Component, inject, OnInit, signal } from '@angular/core';
import {  PatientService } from '../services/patient-service';
import { BloodGroupCountResponseEntity, DoctorResponseDto, PatientResponseDto } from '../models/models';
import { AuthService } from '../security/auth-service';
import { DoctorService } from '../services/doctor-service';
import { Patient } from '../patient';
import { Admin } from '../services/admin';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  private doctorService = inject(DoctorService);
  private adminService = inject(Admin);

  doctors = signal<DoctorResponseDto[]>([]);
  patients = signal<PatientResponseDto[]>([]);
  bloodStats = signal<BloodGroupCountResponseEntity[]>([]);

  ngOnInit(): void {
    this.adminService.getPatientsLists().subscribe(data => this.patients.set(data));
    this.doctorService.getAllDoctors().subscribe(data => this.doctors.set(data));
  }

  logout() {
    this.authService.logout();
  }

}
