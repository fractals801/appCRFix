import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerpersonalinfoComponent } from './customerpersonalinfo.component';

describe('CustomerpersonalinfoComponent', () => {
  let component: CustomerpersonalinfoComponent;
  let fixture: ComponentFixture<CustomerpersonalinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerpersonalinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerpersonalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
