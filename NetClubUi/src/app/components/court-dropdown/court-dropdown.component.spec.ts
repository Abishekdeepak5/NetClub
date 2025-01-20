import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtDropdownComponent } from './court-dropdown.component';

describe('CourtDropdownComponent', () => {
  let component: CourtDropdownComponent;
  let fixture: ComponentFixture<CourtDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourtDropdownComponent]
    });
    fixture = TestBed.createComponent(CourtDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
