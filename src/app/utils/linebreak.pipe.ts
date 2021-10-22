import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'linebreak',
  pure: false
})
export class LinebreakPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.replace(/\n/g, '<br>');
  }

}
