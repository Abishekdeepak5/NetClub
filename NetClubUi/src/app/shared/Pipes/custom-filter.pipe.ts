import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  standalone: true,
    name: "customFilter"

})


export class CustomFilterPipe implements PipeTransform {
  transform(items: any[], filterText: string): any[] {
    if (!items) return [];
    if (!filterText) return items;

    filterText = filterText.toLowerCase();

    return items.filter(item => {
      return item.name.toLowerCase().includes(filterText);
    });
  }
}
