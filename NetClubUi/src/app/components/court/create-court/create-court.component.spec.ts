import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourtComponent } from './create-court.component';

describe('CreateCourtComponent', () => {
  let component: CreateCourtComponent;
  let fixture: ComponentFixture<CreateCourtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCourtComponent]
    });
    fixture = TestBed.createComponent(CreateCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
