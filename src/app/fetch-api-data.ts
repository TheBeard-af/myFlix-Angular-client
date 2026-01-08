import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'Yhttps://afaqmovies-50ba437af709.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) {}

  //  Get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //  User registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

    //  User login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

    //  Get one movie by title
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    //  Get director by name
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get(apiUrl + 'directors/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    //  Get genre by name
  public getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get(apiUrl + 'genres/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    //  Get user by username
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    //  Get favorite movies for a user
  public getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get(apiUrl + 'users/' + username + '/movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    //  Add a movie to favorite movies
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

    //  Edit user
  public editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

    //  Delete user
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

    //  Remove a movie from favorite movies
  public deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  //  Non-typed response extraction
  private extractResponseData(res: any): any {
    return res || {};
  }

  //  Error handler
  private handleError(error: HttpErrorResponse): any {
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