import { NgModule } from '@angular/core';
import { MyDirectiveDirective } from './input-directive.directive';

@NgModule({
  declarations: [MyDirectiveDirective],
  exports: [MyDirectiveDirective]
})
export class MyDirectiveModule { }
