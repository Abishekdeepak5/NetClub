import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabledisplayComponent } from './tabledisplay.component';

const routes: Routes = [{ path: '', component: TabledisplayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
