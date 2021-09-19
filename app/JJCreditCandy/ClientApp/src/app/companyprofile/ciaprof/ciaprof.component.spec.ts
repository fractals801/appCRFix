import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiaprofComponent } from './ciaprof.component';

describe('CiaprofComponent', () => {
  let component: CiaprofComponent;
  let fixture: ComponentFixture<CiaprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiaprofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiaprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
