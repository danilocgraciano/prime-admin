import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskTelefone'
})
export class MaskTelefonePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value) {
      var max = 15;
      value = value.substring(0, max);
      value = value.replace(/\D/g, "");
      if (value.length > 9) {
        value = value.replace(/(\d{0})(\d)/, "$1($2");
        value = value.replace(/(\d{2})(\d)/, "$1) $2");
        value = value.replace(/(\d{4})(\d{1,4})$/, "$1-$2");
      } else
        value = value.replace(/(\d{4})(\d{1,4})$/, "$1-$2");

    }
    return value;
  }

}
