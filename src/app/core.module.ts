import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './auth/interceptors/auth-interceptor.service';
import {LoggingInterceptorService} from './shared/interceptors/logging-interceptor.service';
import {ErrorMessageConverterPipe} from './auth/pipes/error-message-converter.pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true},
    ErrorMessageConverterPipe
  ],
})
export class CoreModule {
}
