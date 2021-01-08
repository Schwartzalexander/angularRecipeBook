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
      .replace('TOO_MANY_ATTEMPTS_TRY_LATER', 'We have blocked all requests from this device due to unusual activity. Try again later.')
      .replace('EMAIL_NOT_FOUND', 'There is no user record corresponding to this identifier. The user may have been deleted.')
      .replace('INVALID_PASSWORD', 'The password is invalid or the user does not have a password.')
      .replace('USER_DISABLED', 'The user account has been disabled by an administrator.');
    return value;
  }

}
