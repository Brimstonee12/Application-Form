import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderByName' })
export class SortByPipe implements PipeTransform {
  transform(array: any): any[] {
    return array.map((country) => country.name.common).sort();
  }
}
