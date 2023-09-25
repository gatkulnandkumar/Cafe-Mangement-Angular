import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeDashboradComponent } from './cafe-dashborad.component';

describe('CafeDashboradComponent', () => {
  let component: CafeDashboradComponent;
  let fixture: ComponentFixture<CafeDashboradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CafeDashboradComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeDashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
