import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdocumentComponent } from './pdocument.component';

describe('PdocumentComponent', () => {
  let component: PdocumentComponent;
  let fixture: ComponentFixture<PdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
