import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsDataGet } from './shipments-data-get';

describe('ShipmentsDataGet', () => {
  let component: ShipmentsDataGet;
  let fixture: ComponentFixture<ShipmentsDataGet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentsDataGet],
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmentsDataGet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
