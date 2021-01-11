import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {AlertComponent} from '../shared/components/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder.directive';
import {ErrorMessageConverterPipe} from './pipes/error-message-converter.pipe';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {State} from './store/auth.reducer';
import {loginStart, signUpStart} from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  authForm: FormGroup | undefined;
  isLoading = false;
  error: string | undefined = '';
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective | undefined;
  private closeSub: Subscription | undefined;
  private storeSub: Subscription | undefined;

  authObservable: Observable<State>;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private authService: AuthService,
              private componentFactoryResolver: ComponentFactoryResolver, private errorMessageConverter: ErrorMessageConverterPipe,
              private store: Store<fromApp.AppState>) {
    this.authObservable = this.store.select(state => state.auth);

  }

  ngOnInit(): void {
    this.authForm = this.createForm();
    this.storeSub = this.authObservable.subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.error;
      if (this.error)
        this.showErrorAlert(this.error);
    });
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

    if (this.isLoginMode) {
      this.store.dispatch(loginStart({email, password, redirectUrl: '/recipes'}));
    } else {
      this.store.dispatch(signUpStart({email, password, redirectUrl: '/recipes'}));
    }
  }

  private showErrorAlert(errorMessage: string): void {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost?.viewContainerRef;
    hostViewContainerRef?.clear();
    const componentRef = hostViewContainerRef?.createComponent(alertComponentFactory);
    if (!componentRef)
      return;
    componentRef.instance.message = this.errorMessageConverter.transform(errorMessage);
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub?.unsubscribe();
      hostViewContainerRef?.clear();
    });
  }

  ngOnDestroy(): void {
    this.closeSub?.unsubscribe();
    this.storeSub?.unsubscribe();
  }
}
