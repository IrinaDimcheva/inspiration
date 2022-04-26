import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle'
})
export class ShortenTitlePipe implements PipeTransform {

  transform(value: string): string {
    return value?.length > 40 ? `${value.substring(0, 40)}...` : value;
  }
}
