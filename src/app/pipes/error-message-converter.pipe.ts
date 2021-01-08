import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'errorMessageConverter'
})
export class ErrorMessageConverterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'string')
      return value;

    value = value.replace('EMAIL_EXISTS', 'The entered email address already exists. Try logging in instead. If you forgot your' +
      ' password, you\'re fucked.')
      .replace('OPERATION_NOT_ALLOWED', 'Password sign-in is disabled for this project.')
      .replace('TOO_MANY_ATTEMPTS_TRY_LATER', 'We have blocked all requests from this device due to unusual activity. Try again later.');
    return value;
  }

}
