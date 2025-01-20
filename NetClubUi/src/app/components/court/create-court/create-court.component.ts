import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { Court} from '../../../shared/models/court.model';
import { CourtService } from '../../../shared/services/court.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { first } from 'rxjs';
@Component({
  selector: 'app-create-court',
  templateUrl: './create-court.component.html',
  styleUrls: ['./create-court.component.css'],
  standalone:true,
  imports:[CommonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    CardModule,]
})
export class CreateCourtComponent {
  
  court:Court=new Court();
  constructor(private courtService:CourtService,private router:Router) {}
 createCourt(){
  this.courtService.createCourt(this.court).pipe(first()).subscribe(
    (msg:any)=>{
      console.log(msg);
      this.router.navigate(['/home']).finally(() =>
      window.location.reload()
      );
    },
  (err: any)=>{
    console.log(err);
      this.router.navigate(['/home']).finally(() =>
      window.location.reload()
      );
    }
 
);
 }
}
