import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {
  TuiTitle,
  TuiButton,
  TuiLink,
  TuiError,
  TuiAlertService,
} from '@taiga-ui/core';
import { TuiButtonLoading } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/legacy';
import { AuthService } from '../../services/auth/auth.service';
import { routes } from '../../app.routes';
@Component({
  selector: 'app-login',
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
    TuiButtonLoading,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  appRoute = routes;
  alert = inject(TuiAlertService);
  error = '';
  isLoading = false;

  checkLoggedIn() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
  ngOnInit() {
    this.checkLoggedIn();
  }

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public onSubmit(): void {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          this.alert.open('Login Successful').subscribe();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.error = err?.error?.error;
        },
      });
    }
    if (!this.loginForm.valid) {
    }
    this.isLoading = false;
  }
}
