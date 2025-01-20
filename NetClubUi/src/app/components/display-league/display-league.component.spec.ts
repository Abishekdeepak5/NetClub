import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLeagueComponent } from './display-league.component';

describe('DisplayLeagueComponent', () => {
  let component: DisplayLeagueComponent;
  let fixture: ComponentFixture<DisplayLeagueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayLeagueComponent]
    });
    fixture = TestBed.createComponent(DisplayLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
