import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiverComponent } from './giver.component';

describe('GiverComponent', () => {
  let component: GiverComponent;
  let fixture: ComponentFixture<GiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
