import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'miniDesc'
})
export class MiniDescPipe implements PipeTransform {

  transform(productDisc:string, limit:number): string {
    return productDisc.split(' ').slice(0, limit).join(' ');
  }

}
