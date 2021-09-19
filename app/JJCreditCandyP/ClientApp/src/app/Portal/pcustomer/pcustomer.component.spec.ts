import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcustomerComponent } from './pcustomer.component';

describe('PcustomerComponent', () => {
  let component: PcustomerComponent;
  let fixture: ComponentFixture<PcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
