import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {AlertComponent} from '../shared/components/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder.directive';
import {ErrorMessageConverterPipe} from './pipes/error-message-converter.pipe';
import {State} from './store/auth.reducer';

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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService,
              private componentFactoryResolver: ComponentFactoryResolver, private errorMessageConverter: ErrorMessageConverterPipe) {
    this.authObservable = this.authService.authObservable;
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
      this.authService.login(email, password, '/recipes');
    } else {
      this.authService.signUp(email, password, '/recipes');

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
