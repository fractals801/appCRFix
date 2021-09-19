import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinvoicesComponent } from './pinvoices.component';

describe('PinvoicesComponent', () => {
  let component: PinvoicesComponent;
  let fixture: ComponentFixture<PinvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
