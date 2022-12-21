import { Pipe, PipeTransform } from '@angular/core';
import { Smoothie } from './Smoothie';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(items: Smoothie[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.smoothieName.toLowerCase().includes(searchText);
    });
  }
}
