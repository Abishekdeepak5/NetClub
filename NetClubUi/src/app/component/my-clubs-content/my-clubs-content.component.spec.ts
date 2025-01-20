import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClubsContentComponent } from './my-clubs-content.component';

describe('MyClubsContentComponent', () => {
  let component: MyClubsContentComponent;
  let fixture: ComponentFixture<MyClubsContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyClubsContentComponent]
    });
    fixture = TestBed.createComponent(MyClubsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
