import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdisputeComponent } from './pdispute.component';

describe('PdisputeComponent', () => {
  let component: PdisputeComponent;
  let fixture: ComponentFixture<PdisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdisputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
