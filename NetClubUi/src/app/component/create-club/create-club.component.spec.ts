import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClubComponent } from './create-club.component';

describe('CreateClubComponent', () => {
  let component: CreateClubComponent;
  let fixture: ComponentFixture<CreateClubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateClubComponent]
    });
    fixture = TestBed.createComponent(CreateClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
