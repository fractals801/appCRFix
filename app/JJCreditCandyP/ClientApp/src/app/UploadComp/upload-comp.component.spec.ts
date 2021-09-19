import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCompComponent } from './upload-comp.component';

describe('UploadCompComponent', () => {
  let component: UploadCompComponent;
  let fixture: ComponentFixture<UploadCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
