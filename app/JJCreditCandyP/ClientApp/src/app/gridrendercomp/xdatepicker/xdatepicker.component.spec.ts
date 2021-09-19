import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XdatepickerComponent } from './xdatepicker.component';

describe('XdatepickerComponent', () => {
  let component: XdatepickerComponent;
  let fixture: ComponentFixture<XdatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XdatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XdatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
