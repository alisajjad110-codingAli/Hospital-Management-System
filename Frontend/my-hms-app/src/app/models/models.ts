export enum RoleType {
    ADMIN = 'ADMIN',
    DOCTOR = 'DOCTOR',
    PATIENT = 'PATIENT'
}

export enum BloodGroup {
    A_POSITIVE = 'A_POSITIVE',
    A_NEGATIVE = 'A_NEGATIVE',
    B_POSITIVE = 'B_POSITIVE',
    B_NEGATIVE = 'B_NEGATIVE',
    AB_POSITIVE = 'AB_POSITIVE',
    AB_NEGATIVE = 'AB_NEGATIVE',
    O_POSITIVE = 'O_POSITIVE',
    O_NEGATIVE = 'O_NEGATIVE'
}

export interface LoginRequestDto {
    email : string;
    password: string;
}

export interface LoginResponseDto {
    jwtToken: string;
    userId: number;
    roles: RoleType[];
}

export interface SignUpRequestDto {
    name: string;
    email: string;
    password: string;
    roles: RoleType[];
}

export interface SignUpResponseDto {
    name: string;
    id: number;
    email: string;
}

export interface PatientResponseDto {
    id: number;
    name: string;
   email: string;
  bloodGroup: BloodGroup;
  birthDate?: string;
  gender?: string;
}

export interface DoctorResponseDto {
  id: number;
  name: string;
  specialization: string;
  qualification: string;
  email: string;
}

export interface OnboardDoctorRequestDto {
  userId: number;
  specialization: string;
  qualification: string;
}

export interface CreateAppointmentRequestDto {
  doctorId: number;
  patientId: number;
  appointmentTime: string; // ISO String
  reason: string;
}

export interface AppointmentResponseDto {
  id: number;
  appointmentTime: string;
  reason: string;
  doctorName: string;
  patientName: string;
}

export interface BloodGroupCountResponseEntity {
  bloodGroup: BloodGroup;
  count: number;
}
