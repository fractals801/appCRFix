import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaganComponent } from './pagan.component';

describe('PaganComponent', () => {
  let component: PaganComponent;
  let fixture: ComponentFixture<PaganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaganComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
