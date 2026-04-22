import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsDataPut } from './shipments-data-put';

describe('ShipmentsDataPut', () => {
  let component: ShipmentsDataPut;
  let fixture: ComponentFixture<ShipmentsDataPut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentsDataPut],
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmentsDataPut);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
