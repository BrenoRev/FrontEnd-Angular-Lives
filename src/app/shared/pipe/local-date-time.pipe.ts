import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localDateTime'
})
export class LocalDateTimePipe implements PipeTransform {

  transform(date: string): string {
    // Transformando a data recebida em moment
    let dateOut: moment.Moment = moment(date, "YYYY-MM-DDTHH:mm:ss");
    // Retornando do jeito que quiser
    return dateOut.format("DD-MM-YYYY HH:mm");
  }

}
