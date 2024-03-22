import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termText',
})
export class TermTextPipe implements PipeTransform {
  transform(text: string, x: number, y: number): string {
    return text.split(' ').slice(x, y).join(' ');
  }
}
