import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshTOken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  urlSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
  apiKey = 'AIzaSyALO01jLzk5PTc-m0Wynz3nEvZRzXJ07tI';

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.urlSignUp + '?key=' + this.apiKey, {email, password, returnSecureToken: 'true'})
      .pipe(catchError(this.handleError));
    // The previous line does the same as the following three lines:
    // .pipe(catchError(errorResponse => {
    //   return this.handleError(errorResponse);
    // }));
  }

  signIn(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.urlSignIn + '?key=' + this.apiKey, {email, password, returnSecureToken: 'true'})
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    if (!errorResponse || !errorResponse.error || !errorResponse.error.error || !errorResponse.error.error.message)
      return throwError('An unknown error occurred.');
    else
      return throwError(errorResponse.error.error.message);
  }
}
