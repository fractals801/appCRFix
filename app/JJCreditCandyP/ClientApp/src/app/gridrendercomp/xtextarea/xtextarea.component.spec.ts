import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XtextareaComponent } from './xtextarea.component';

describe('XtextareaComponent', () => {
  let component: XtextareaComponent;
  let fixture: ComponentFixture<XtextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XtextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XtextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
