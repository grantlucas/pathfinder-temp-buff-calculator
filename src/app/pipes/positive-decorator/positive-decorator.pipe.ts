import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positiveDecorator'
})
export class PositiveDecoratorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // FIXME: This breaks when passing through decimal pipe and commas are
    // added as it's no longer a number. None of our values should hit this but
    // still a bug ot fix none the less.
    if (!isNaN(value) && value > 0) {
      return '+' + value;
    }
    return value;
  }

}
