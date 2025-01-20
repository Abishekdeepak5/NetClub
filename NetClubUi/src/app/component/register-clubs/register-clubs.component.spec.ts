import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClubsComponent } from './register-clubs.component';

describe('RegisterClubsComponent', () => {
  let component: RegisterClubsComponent;
  let fixture: ComponentFixture<RegisterClubsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterClubsComponent]
    });
    fixture = TestBed.createComponent(RegisterClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
