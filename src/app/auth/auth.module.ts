import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {ErrorMessageConverterPipe} from './pipes/error-message-converter.pipe';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    ErrorMessageConverterPipe,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'auth', component: AuthComponent},
    ]),
  ]
})
export class AuthModule {
}
