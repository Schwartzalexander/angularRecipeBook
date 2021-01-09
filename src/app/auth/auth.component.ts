import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthResponseData, AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm: FormGroup | undefined;
  isLoading = false;
  errorMessage = '';

  constructor(private activeRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authForm = this.createForm();
  }

  createForm(): FormGroup {
    const formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
    return formGroup;
  }

  onSwitchClicked(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    console.log(this.authForm);
    const email = this.authForm?.value.email;
    const password = this.authForm?.value.password;

    const user = new User('', '', email, password, '', [], '', '');

    this.errorMessage = '';
    this.isLoading = true;
    if (this.isLoginMode) {
      this.signIn(user);
    } else {
      this.signUp(user);
    }
  }

  private signUp(user: User): void {
    const observable = this.authService.signUp(user.email, user.password);
    this.handleSignUpOrIn(observable);

  }

  private signIn(user: User): void {
    const observable = this.authService.signIn(user.email, user.password);
    this.handleSignUpOrIn(observable);
  }

  private handleSignUpOrIn(observable: Observable<AuthResponseData>): void {
    this.isLoading = false;
    observable.subscribe(data => {
      // on success:
      this.authForm?.reset();
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      // on error:
      console.log(errorMessage);
      this.errorMessage = errorMessage;
    });
  }
}
