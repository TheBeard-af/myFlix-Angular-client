import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Observable, BehaviorSubject } from 'rxjs';

import { FetchApiDataService } from '../fetch-api-data';
import { Movie, User } from '../api-response.model';

import { MatDialog } from '@angular/material/dialog';
import { Genre } from '../genre/genre';
import { Director } from '../director/director';
import { Synopsis } from '../synopsis/synopsis';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss'],
})
export class MovieCard {
  movies$: Observable<Movie[]>;

  private favoriteIdsSubject = new BehaviorSubject<string[]>([]);
  favoriteMovieIds$ = this.favoriteIdsSubject.asObservable();

  constructor(
    private fetchApiData: FetchApiDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.movies$ = this.fetchApiData.getAllMovies();

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      this.favoriteIdsSubject.next(user.FavoriteMovies ?? []);
    }
  }

  openGenreDialog(movie: Movie): void {
    this.dialog.open(Genre, {
      width: '400px',
      data: {
        name: movie.genre.name,
        description: movie.genre.description,
      },
    });
  }

  openDirectorDialog(movie: Movie): void {
    this.dialog.open(Director, {
      width: '400px',
      data: {
        name: movie.director.name,
        bio: movie.director.bio,
        birthdate: movie.director.birthdate,
      },
    });
  }

  openSynopsisDialog(movie: Movie): void {
    this.dialog.open(Synopsis, {
      width: '400px',
      data: {
        title: movie.title,
        description: movie.description,
      },
    });
  }

  addToFavorites(movieId: string): void {
    const currentIds = this.favoriteIdsSubject.value;

    if (currentIds.includes(movieId)) {
      this.snackBar.open('Already in favorites', 'OK', { duration: 2000 });
      return;
    }

    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    const username =
      JSON.parse(storedUser).Username ||
      JSON.parse(storedUser).username;

    this.fetchApiData.addFavoriteMovie(username, movieId).subscribe({
      next: (updatedUser) => {
        this.snackBar.open('Added to favorites', 'OK', { duration: 2000 });

        localStorage.setItem('user', JSON.stringify(updatedUser));

        // ✅ Immutable update
        this.favoriteIdsSubject.next([...currentIds, movieId]);
      },
      error: (err) =>
        this.snackBar.open(err.message, 'OK', { duration: 3000 }),
    });
  }
}