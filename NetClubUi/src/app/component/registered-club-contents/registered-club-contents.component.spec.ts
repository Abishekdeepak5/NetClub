import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredClubContentsComponent } from './registered-club-contents.component';

describe('RegisteredClubContentsComponent', () => {
  let component: RegisteredClubContentsComponent;
  let fixture: ComponentFixture<RegisteredClubContentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredClubContentsComponent]
    });
    fixture = TestBed.createComponent(RegisteredClubContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
