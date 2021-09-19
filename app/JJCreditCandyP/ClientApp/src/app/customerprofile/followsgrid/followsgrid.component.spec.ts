import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowsgridComponent } from './followsgrid.component';

describe('FollowsgridComponent', () => {
  let component: FollowsgridComponent;
  let fixture: ComponentFixture<FollowsgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowsgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowsgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
