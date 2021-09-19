import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdemograComponent } from './customerdemogra.component';

describe('CustomerdemograComponent', () => {
  let component: CustomerdemograComponent;
  let fixture: ComponentFixture<CustomerdemograComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerdemograComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerdemograComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
