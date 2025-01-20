import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from '../../shared/services/core.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  // standalone:true,
  // imports:[CommonModule],
})
export class LoaderComponent implements OnInit{
  load:any;
  isLoading:any;
  constructor(private coreService:CoreService){}
  ngOnInit(): void {
    window.addEventListener("load",()=>{
      const loader=document.querySelector(".loader");
      this.load=loader;
      loader?.classList.add("loader-hidden");
  
      loader?.addEventListener("transitionend", () =>{
        // document.body.removeChild(loader); 
        this.coreService.isLoading.next(false);
        
      });
    });
    this.coreService.isLoadObs$.subscribe((isLoading)=>{
      this.isLoading=isLoading;
      this.showMsg(isLoading);

    });
  }
  stopLoader(){
    this.coreService.isLoading.next(false);
  }
  showMsg(msg:any){
    console.log(msg);
  }
}
