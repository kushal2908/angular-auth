import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TuiTitle, TuiButton, TuiLink, TuiError } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    TuiInputModule,
    TuiTitle,
    ReactiveFormsModule,
    RouterModule,
    TuiButton,
    TuiLink,
    RouterLink,
    TuiError,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  authService = inject(AuthService);
  router = inject(Router);
  error = '';

  checkLoggedIn() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
  ngOnInit() {
    this.checkLoggedIn();
  }

  protected registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.registrationForm.valid) {
      this.authService
        .login(this.registrationForm.value)
        .subscribe((data: any) => {
          if (this.authService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
          }
          console.log(data);
        });
    } else {
      this.error = 'All field require';
    }
  }
}
