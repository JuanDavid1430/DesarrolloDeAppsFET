import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RickyPage } from './ricky.page';

describe('RickyPage', () => {
  let component: RickyPage;
  let fixture: ComponentFixture<RickyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RickyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
