import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../security/auth-service';
import { Router, RouterLink } from '@angular/router';
import { RoleType, SignUpRequestDto } from '../models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  availableRoles : RoleType[] = [RoleType.ADMIN, RoleType.DOCTOR, RoleType.PATIENT];

  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    roles: [[RoleType.PATIENT], [Validators.required]]
  });

  onRoleChange(event: Event) : void {
    const selectedRole = (event.target as HTMLSelectElement).value as RoleType;
    this.signupForm.patchValue({roles: [selectedRole]})
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.successMessage.set(null);
    

    const requestPayload: SignUpRequestDto = this.signupForm.value as SignUpRequestDto;
    this.authService.signUp(requestPayload).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.successMessage.set('Account created successfully! Redirecting to login...');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error?.message || 'Failed to sign up. Please try again.');
        }
      }); 
    }
  }
}
