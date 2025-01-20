import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { NavbarRoutingModule } from './navbar-routing.module';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../shared/services/auth.service';
import { LoaderComponent } from '../../component/loader/loader.component';

@NgModule({
  declarations: [
    // NavbarComponent
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule,
  ],
  providers:[],
})
export class NavbarModule { }
