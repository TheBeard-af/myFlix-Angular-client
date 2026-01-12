import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data';
import { User, Movie } from '../api-response.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BehaviorSubject, switchMap, map, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  MatButtonModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss'],
})
export class UserProfile {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  favoriteMovies$: Observable<Movie[]> = this.user$.pipe(
    switchMap((user) =>
      user
        ? this.fetchApiData.getAllMovies().pipe(
            map((movies) =>
              movies.filter((movie) =>
                user.FavoriteMovies.includes(movie._id)
              )
            )
          )
        : []
    )
  );

  isEditing = false;

editUserData = {
  Username: '',
  Email: '',
  Birthday: '',
};

  constructor(
  private fetchApiData: FetchApiDataService,
  private snackBar: MatSnackBar
) {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return;

  const username =
    JSON.parse(storedUser).Username ||
    JSON.parse(storedUser).username;

  this.fetchApiData.getUser(username).subscribe({
    next: (user) => {
      // keep backend as source of truth
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);

      //  populate edit form defaults
      this.editUserData = {
  Username: user.Username,
  Email: user.Email,
  Birthday: user.Birthday
    ? user.Birthday.substring(0, 10)
    : '',
};
    },
    error: (err) => console.error(err),
  });
}
startEdit(): void {
  this.isEditing = true;
}

cancelEdit(): void {
  this.isEditing = false;
}
saveProfile(): void {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return;

  const currentUsername =
    JSON.parse(storedUser).Username ||
    JSON.parse(storedUser).username;

  const updatedData = {
    Username: this.editUserData.Username,
    Email: this.editUserData.Email,
    Birthday: this.editUserData.Birthday
      ? new Date(this.editUserData.Birthday).toISOString()
      : null,
  };

  this.fetchApiData.editUser(currentUsername, updatedData).subscribe({
    next: (updatedUser) => {
      //  Update localStorage and reactive stream
      localStorage.setItem('user', JSON.stringify(updatedUser));
      this.userSubject.next(updatedUser);

      //  Exit edit mode
      this.isEditing = false;

      this.snackBar.open('Profile updated successfully', 'OK', {
        duration: 2000,
      });
    },
    error: (err) => {
      this.snackBar.open(err.message, 'OK', {
        duration: 3000,
      });
    },
  });
}
  removeFromFavorites(user: User, movieId: string): void {
    this.fetchApiData
      .deleteFavoriteMovie(user.Username, movieId)
      .subscribe({
        next: (updatedUser) => {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.userSubject.next(updatedUser);

          this.snackBar.open('Removed from favorites', 'OK', {
            duration: 2000,
          });
        },
        error: (err) =>
          this.snackBar.open(err.message, 'OK', { duration: 3000 }),
      });
  }
}