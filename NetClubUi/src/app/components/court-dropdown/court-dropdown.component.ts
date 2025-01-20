import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Court } from '../../shared/models/court.model';
import { CourtService } from '../../shared/services/court.service';
import { first } from 'rxjs';
@Component({
  selector: 'app-court-dropdown',
  templateUrl: './court-dropdown.component.html',
  styleUrls: ['./court-dropdown.component.css'],
  standalone:true,
  imports:[ CommonModule, FormsModule]
})
export class CourtDropdownComponent implements OnInit{
  items:Court[]=[];
  // @Input() items: Court[] = [];
  @Output() itemSelected = new EventEmitter<Court>();

  searchTerm: string = '';
  filteredItems: Court[] = [];

  constructor(private courtService:CourtService) { }

  ngOnInit(): void {
    this.courtService.getCourts().pipe(first()).subscribe(
      (courts:Court[])=>{
        this.items=courts;
        this.filteredItems = this.items;
      },
    (err: any)=>{console.log(err);}
    );
   
  }

  filterItems() {
    if(this.searchTerm==""){
      this.filteredItems=[];
    }else{
      this.filteredItems = this.items.filter(item =>
        item.court_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  selectItem(item: Court) {
    this.itemSelected.emit(item);
  }

}
