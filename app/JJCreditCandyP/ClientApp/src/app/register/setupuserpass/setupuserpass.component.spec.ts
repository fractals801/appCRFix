import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupuserpassComponent } from './setupuserpass.component';

describe('SetupuserpassComponent', () => {
  let component: SetupuserpassComponent;
  let fixture: ComponentFixture<SetupuserpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupuserpassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupuserpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
