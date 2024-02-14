import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationreviewComponent } from './donationreview.component';

describe('DonationreviewComponent', () => {
  let component: DonationreviewComponent;
  let fixture: ComponentFixture<DonationreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
