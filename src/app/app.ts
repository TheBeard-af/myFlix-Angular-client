import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink  } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
/**
 * Root component of the myFlix Angular application.
 *
 * This component is responsible for rendering the main layout,
 * handling navigation, and managing basic authentication state
 * such as login and logout functionality.
 */
export class App {
  constructor(private router: Router) {}

  /**
 * Checks whether the user is currently logged in.
 *
 * @returns True if a JWT token exists in local storage, otherwise false.
 */

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
 * Logs the user out of the application.
 *
 * Clears all data from local storage and redirects
 * the user to the welcome page.
 */

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}