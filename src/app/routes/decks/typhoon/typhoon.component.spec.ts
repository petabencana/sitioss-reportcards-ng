import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TyphoonComponent } from './typhoon.component';

describe('TyphoonComponent', () => {
  let component: TyphoonComponent;
  let fixture: ComponentFixture<TyphoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TyphoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TyphoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});