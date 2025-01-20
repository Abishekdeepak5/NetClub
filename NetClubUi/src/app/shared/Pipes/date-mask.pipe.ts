import { Pipe , PipeTransform} from "@angular/core";
@Pipe({
    standalone: true,
    name: "dateformat"
})
export class DateformatPipe implements PipeTransform{
    transform(value: string):string {
        // const inputDateString = '2024-02-11T17:53:39.2103658';
        const inputDate = new Date(value);
        return inputDate.toLocaleString();
        
    }
}
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
// @Pipe({
//   standalone: true,
//   name: 'exponentialStrength'
// })
// export class ExponentialStrengthPipe implements PipeTransform {
//   transform(value: number, exponent = 1): number {
//     return Math.pow(value, exponent);
//   }
// }