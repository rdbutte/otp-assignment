import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) { }

  sendOtp(phone: string) {
    return this.http.post(`${this.baseUrl}/send-otp`, { phone });
  }

  verifyOtp(phone: string, otp: string) {
    return this.http.post(`${this.baseUrl}/verify-otp`, { phone, otp });
  }
}
