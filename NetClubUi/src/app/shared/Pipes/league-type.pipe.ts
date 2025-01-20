import { Pipe , PipeTransform} from "@angular/core";
@Pipe({
    standalone: true,
    name: "leagueType"
})
export class LeagueTypePipe implements PipeTransform{
    transform(value: number):string {
        switch(value){
            case 1:
                return "Mens Singles"
            case 2:
                return "Womens Single"
            case 3:
                return "Mens Doubles"
            case 4:
                return "Womens Double"
            case 5:
                return "Mixed Doubles"
            case 6:
                return "Mens Team"
            case 7:
                return "Womens Team"
            case 8:
                return "Mixed Team"
            default:
                return "Error"
        }       
    }
}