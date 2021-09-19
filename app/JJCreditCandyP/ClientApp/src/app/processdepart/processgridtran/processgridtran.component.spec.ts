import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ProcessgridtranComponent } from './processgridtran.component';

describe('ServicegridtranComponent', () => {
  let component: ProcessgridtranComponent;
  let fixture: ComponentFixture<ProcessgridtranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessgridtranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessgridtranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
