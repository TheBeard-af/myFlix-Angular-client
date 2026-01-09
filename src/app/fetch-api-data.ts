import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie, User, AuthResponse } from './api-response.model';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://afaqmovies-50ba437af709.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) {}

  //  Get all movies
public getAllMovies(): Observable<Movie[]> {
  const token = localStorage.getItem('token') ?? '';
  return this.http.get<Movie[]>(apiUrl + 'movies', {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    catchError(this.handleError)
  );
}

  //  User registration
  public userRegistration(userDetails: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

    //  User login
  public userLogin(userDetails: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

    //  Get one movie by title
  public getOneMovie(title: string): Observable<Movie> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<Movie>(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

    //  Get director by name
  public getDirector(name: string): Observable<Movie['Director']> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<Movie['Director']>(apiUrl + 'directors/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

    //  Get genre by name
  public getGenre(name: string): Observable<Movie['Genre']> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<Movie['Genre']>(apiUrl + 'genres/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

    //  Get user by username
  public getUser(username: string): Observable<User> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<User>(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

    //  Get favorite movies for a user
  public getFavoriteMovies(username: string): Observable<Movie[]> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<Movie[]>(apiUrl + 'users/' + username + '/movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

    //  Add a movie to favorite movies
  public addFavoriteMovie(username: string, movieId: string): Observable<User> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.post<User>(apiUrl + 'users/' + username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

    //  Edit user
  public editUser(username: string, userDetails: any): Observable<User> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.put<User>(apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

    //  Delete user
  public deleteUser(username: string): Observable<void> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.delete<void>(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

    //  Remove a movie from favorite movies
  public deleteFavoriteMovie(username: string, movieId: string): Observable<User> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.delete<User>(apiUrl + 'users/' + username + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  //  Error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, Error body is: ${error.error}`
      );
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}