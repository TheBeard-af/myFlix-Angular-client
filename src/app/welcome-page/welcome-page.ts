import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { UserLoginForm } from '../user-login-form/user-login-form';
import { UserRegistrationForm } from '../user-registration-form/user-registration-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './welcome-page.html',
  styleUrls: ['./welcome-page.scss'],
})
export class WelcomePage {
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
  const token = localStorage.getItem('token');

  if (token) {
    this.router.navigate(['movies']);
  }
}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationForm, {
      width: '280px',
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginForm, {
      width: '280px',
    });
  }
}