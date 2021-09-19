import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframecompComponent } from './iframecomp.component';

describe('IframecompComponent', () => {
  let component: IframecompComponent;
  let fixture: ComponentFixture<IframecompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframecompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframecompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
