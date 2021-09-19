import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicegridtranComponent } from './servicegridtran.component';

describe('ServicegridtranComponent', () => {
  let component: ServicegridtranComponent;
  let fixture: ComponentFixture<ServicegridtranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicegridtranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicegridtranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
