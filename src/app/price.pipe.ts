import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(price: number, curancy: string): string {
    return `${price} ${curancy}`;
  }
}
