import { Pipe, PipeTransform } from '@angular/core';
import { Country } from "../types/country"

@Pipe({ name: 'orderByName' })
export class SortByPipe implements PipeTransform {
  transform(array: Country[]): string[] {
    return array.map((country) => country.name.common).sort();
  }
}
