import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenContent'
})
export class ShortenContentPipe implements PipeTransform {

  transform(value: string): string {
    return value?.length > 140 ? `${value.substring(0, 140)}...` : value;
  }
}
