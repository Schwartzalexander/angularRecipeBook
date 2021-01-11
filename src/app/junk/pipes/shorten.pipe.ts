import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: unknown, maxLength: number, showDots: boolean): any {
    if (typeof value !== 'string')
      return value;

    if (value.length > maxLength)
      return value.substr(0, maxLength) + (showDots ? '...' : '');
    return value;
  }

}
