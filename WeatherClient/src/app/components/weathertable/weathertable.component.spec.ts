import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathertableComponent } from './weathertable.component';

describe('WeathertableComponent', () => {
  let component: WeathertableComponent;
  let fixture: ComponentFixture<WeathertableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeathertableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeathertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
