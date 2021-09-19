import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PscoreComponent } from './pscore.component';

describe('PscoreComponent', () => {
  let component: PscoreComponent;
  let fixture: ComponentFixture<PscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PscoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
