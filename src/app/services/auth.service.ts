import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../model/user.model';
import {Router} from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshTOken: string;
  expiresIn: number;
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
  userSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.urlSignUp + '?key=' + this.apiKey, {email, password, returnSecureToken: 'true'})
      .pipe(catchError(this.handleError), tap(responseData => {
          this.handleAuthentication(responseData, password);
        }
      ));
    // The previous line does the same as the following three lines:
    // .pipe(catchError(errorResponse => {
    //   return this.handleError(errorResponse);
    // }));
  }

  signIn(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.urlSignIn + '?key=' + this.apiKey, {email, password, returnSecureToken: 'true'})
      .pipe(catchError(this.handleError), tap(responseData => {
        this.handleAuthentication(responseData, password);
      }));
  }

  private handleAuthentication(responseData: AuthResponseData, password: string): any {
    const expirationDate = new Date(new Date().getTime() + responseData.expiresIn * 1000);
    const user = new User(responseData.localId, '', responseData.email, password, '', [], '', responseData.idToken, expirationDate);
    this.userSubject.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    if (!errorResponse || !errorResponse.error || !errorResponse.error.error || !errorResponse.error.error.message)
      return throwError('An unknown error occurred.');
    else
      return throwError(errorResponse.error.error.message);
  }

  /**
   * Logs the user out by sending null to the subject.
   */
  logout(): void {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
  }
}
