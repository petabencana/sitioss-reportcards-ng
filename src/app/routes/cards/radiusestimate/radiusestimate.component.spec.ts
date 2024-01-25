import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiusestimateComponent } from './radiusestimate.component';

describe('RadiusestimateComponent', () => {
  let component: RadiusestimateComponent;
  let fixture: ComponentFixture<RadiusestimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadiusestimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiusestimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
