import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshTOken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  apiKey = 'AIzaSyALO01jLzk5PTc-m0Wynz3nEvZRzXJ07tI';

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.urlSignUp + '?key=' + this.apiKey, {email, password, returnSecureToken: 'true'})
      .pipe(catchError(errorResponse => {

        if (!errorResponse || !errorResponse.error || !errorResponse.error.error || !errorResponse.error.error.message)
          return throwError('An unknown error occured');
        else
          return throwError(errorResponse.error.error.message);
      }));
  }
}
