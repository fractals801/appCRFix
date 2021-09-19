import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiagridComponent } from './ciagrid.component';

describe('CiagridComponent', () => {
  let component: CiagridComponent;
  let fixture: ComponentFixture<CiagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiagridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
