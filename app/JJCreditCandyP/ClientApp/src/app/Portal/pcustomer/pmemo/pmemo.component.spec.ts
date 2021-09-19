import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmemoComponent } from './pmemo.component';

describe('PmemoComponent', () => {
  let component: PmemoComponent;
  let fixture: ComponentFixture<PmemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
