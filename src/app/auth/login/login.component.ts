import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule,
    MatIconModule, ReactiveFormsModule, HttpClientModule
  ],
  templateUrl: './login.component.html',
  styles: ``,
  providers: [AuthService]
})
export class LoginComponent {
  
  hide = signal(true);
  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
  clickEvent(event:MouseEvent){
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          if (response && response.length > 0) {
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Invalid username or password');
          }
        },
        error: (err) => {
          console.error('Error during authentication: ', err);
        },
      });
    }
  }

}
