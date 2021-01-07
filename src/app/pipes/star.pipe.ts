import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'star'
})
export class StarPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'string')
      return value;

    let i = 0;
    let result = '';
    while (i < value?.length) {
      result += '*';
      i++;
    }

    return result;
  }

}
