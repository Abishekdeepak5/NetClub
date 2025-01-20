import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisContentComponent } from './tennis-content.component';

describe('TennisContentComponent', () => {
  let component: TennisContentComponent;
  let fixture: ComponentFixture<TennisContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TennisContentComponent]
    });
    fixture = TestBed.createComponent(TennisContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
