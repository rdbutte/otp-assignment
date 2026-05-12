import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp',
  imports: [FormsModule],
  templateUrl: './otp.html',
  styleUrl: './otp.css',
})
export class OtpComponent {
  phone = '';
  otp = '';
  message = '';
  timer = 0;
  interval: any;

  constructor(private auth: AuthService) { }

  public sendOtp(): void {
    this.auth.sendOtp(this.phone).subscribe({
      next: () => {
        this.message = 'OTP sent!';
        this.startTimer();
      },
      error: () => this.message = 'Error sending OTP'
    });
  }

  public verifyOtp(): void {
    this.auth.verifyOtp(this.phone, this.otp).subscribe({
      next: (res: any) => {
        this.message = 'Verified ✅';
        localStorage.setItem('token', res.token);
      },
      error: () => this.message = 'Invalid OTP ❌'
    });
  }

  public startTimer(): void {
    this.timer = 120;
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) clearInterval(this.interval);
    }, 1000);
  }
}
