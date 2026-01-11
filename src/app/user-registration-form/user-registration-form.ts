import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSnackBarModule } from '@angular/material/snack-bar';

// from Exercise 6.2
import { FetchApiDataService } from '../fetch-api-data';

@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [
    FormsModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatSnackBarModule
  ],
  templateUrl: './user-registration-form.html',
  styleUrl: './user-registration-form.scss'
})
export class UserRegistrationForm {

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationForm>,
    public snackBar: MatSnackBar
  ) {}

  registerUser(): void {
  this.fetchApiData.userRegistration(this.userData).subscribe({
    next: (result: any) => {
      console.log('Registration success:', result);
      this.dialogRef.close();
      this.snackBar.open(
        result.message ?? 'User registered successfully',
        'OK',
        { duration: 2000 }
      );
    },
    error: (error: any) => {
      console.error('Registration error:', error);
      this.snackBar.open(
        error?.message ?? 'Registration failed',
        'OK',
        { duration: 3000 }
      );
    }
  });
}
}
