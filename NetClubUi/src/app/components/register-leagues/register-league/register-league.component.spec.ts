import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLeagueComponent } from './register-league.component';

describe('RegisterLeagueComponent', () => {
  let component: RegisterLeagueComponent;
  let fixture: ComponentFixture<RegisterLeagueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterLeagueComponent]
    });
    fixture = TestBed.createComponent(RegisterLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
