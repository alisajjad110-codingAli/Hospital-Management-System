import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequestDto, LoginResponseDto, SignUpRequestDto, SignUpResponseDto } from '../models/models';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn:"root"
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private baseURL = "http://localhost:8080/auth";

    currentUserToken = signal<string | null>(localStorage.getItem('token'));

    login(credentials: LoginRequestDto) : Observable<LoginResponseDto> {
        return this.http.post<LoginResponseDto>(`${this.baseURL}/login`, credentials).pipe(
            tap((response) => {
                localStorage.setItem('token', response.jwtToken);
                localStorage.setItem('userId', response.userId.toString());
                localStorage.setItem('roles', JSON.stringify(response.roles));
                this.currentUserToken.set(response.jwtToken);
            })
        );

    }

    signUp(data: SignUpRequestDto) : Observable<SignUpResponseDto> {
        return this.http.post<SignUpResponseDto>(`${this.baseURL}/signup`, data);

    }

    logout() : void {
        localStorage.clear();
        this.currentUserToken.set(null);
        this.router.navigate(['/login']);
    }

    getToken() : string | null {
        return localStorage.getItem('token');
    }

    isLoggedIn() {
        return !!this.getToken();
    }

    getUserRoles() {
        const roles = localStorage.getItem('roles');
        return roles ? JSON.parse(roles) : [];
    }
}
