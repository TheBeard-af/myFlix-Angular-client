import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FetchApiDataService } from '../fetch-api-data';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  templateUrl: './user-login-form.html',
  styleUrl: './user-login-form.scss'
})
export class UserLoginForm {

  @Input() userData = {
    Username: '',
    Password: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginForm>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result: any) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);

        this.dialogRef.close();
        this.snackBar.open('Login successful', 'OK', {
          duration: 2000
        });

        this.router.navigate(['movies']);
      },
      error: (error: any) => {
        this.snackBar.open(
          error?.message ?? 'Login failed',
          'OK',
          { duration: 3000 }
        );
      }
    });
  }
}