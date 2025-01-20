import { Component,EventEmitter, Input, Output,OnInit, OnDestroy} from '@angular/core';
import { ClubService } from '../../shared/services/club.service';
import { MyClub } from '../../shared/models/club.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  item:any;
  newitem:any;
  ngOnInit(): void {
    this.clubService.selectedClub$.subscribe((item)=>{
      if(item==null){
        this.router.navigate(['/home']);
      }
        this.item=item;
    });
  }
  constructor(private clubService:ClubService,private router: Router) {
  }
  navi(){
    this.router.navigate(['/login']);
  } 
  @Input() data: any[] = [];
  @Output() itemClicked = new EventEmitter<any>();

  onItemClick(item: any) {
    this.itemClicked.emit(item);
  }
}
