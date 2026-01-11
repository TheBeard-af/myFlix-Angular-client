import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserRegistrationForm } from './user-registration-form/user-registration-form';
import { UserLoginForm } from './user-login-form/user-login-form';

@Component({
  
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatDialogModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
  
})

export class App {
  protected readonly title = signal('myFlix-Angular-client');

  constructor(public dialog: MatDialog) {}

  openUserRegistrationDialog(): void {
  this.dialog.open(UserRegistrationForm, {
    width: '280px'
  });
}

  openUserLoginDialog(): void {
  this.dialog.open(UserLoginForm, {
    width: '280px'
  });
}
}
