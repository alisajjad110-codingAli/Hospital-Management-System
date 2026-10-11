import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment-service';
import { DoctorService } from '../services/doctor-service';
import { PatientService } from '../services/patient-service';
import { AppointmentResponseDto, CreateAppointmentRequestDto, DoctorResponseDto, PatientResponseDto } from '../models/models';
import { Admin } from '../services/admin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.css',
})
export class AdminComponent implements OnInit {
  private fb = inject(FormBuilder);
  private appointmentService = inject(AppointmentService);
  private doctorService = inject(DoctorService);
  private patientService = inject(PatientService);
  private adminService = inject(Admin)

  appointments = signal<AppointmentResponseDto[]>([]);
  doctors = signal<DoctorResponseDto[]>([]);
  patients = signal<PatientResponseDto[]>([]);

  isLoading = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  appointmentForm = this.fb.group({
    patientId : [null as number | null, [Validators.required]],
    doctorId : [null as number | null, [Validators.required]],
    appointmentTime: [null as number | null, [Validators.required]],
    reason: ['', [Validators.required, Validators.minLength(3)]]
  });

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading.set(true);

    this.doctorService.getAllDoctors().subscribe({
      next: (data) => this.doctors.set(data),
      error: () => this.errorMessage.set("Failed to Fetch doctors")
    });

    this.adminService.getPatientsLists().subscribe({
      next: (data) => this.patients.set(data),
      error: () => this.errorMessage.set("Failed to Fetch patients")
    });

    this.appointmentService.getAllAppointments().subscribe({
      next: (data) => {
        this.appointments.set(data)
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set("Failed to Fetch appointments!")
        this.isLoading.set(false);
      }
    });
  }

  onScheduleAppointment(): void {
    if (this.appointmentForm.valid) {
      this.isSubmitting.set(true);
      this.errorMessage.set(null);
      this.successMessage.set(null);
    

    const formValue = this.appointmentForm.value;

    // Convert local datetime input string into standard ISO format
    const isOfTime = new Date(formValue.appointmentTime!).toISOString();

    const payload: CreateAppointmentRequestDto = {
      patientId: Number(formValue.patientId!),
      doctorId: Number(formValue.doctorId!),
      appointmentTime: isOfTime,
      reason: formValue.reason!
    };

    this.appointmentService.createAppointment(payload).subscribe({
      next: (createdApt) => {
        this.isSubmitting.set(false);
        this.successMessage.set("Appointment Scheduled Successfully");
        this.appointmentForm.reset();

        //Refresh list to include the newly created appointment
        this.appointments.update( prev => [...createdApt, ...prev]);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.error?.message || "Failed to schedule appointment. Please try again.");
      }

    })
    }
  }
}
