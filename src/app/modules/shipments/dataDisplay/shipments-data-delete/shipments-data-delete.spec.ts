import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsDataDelete } from './shipments-data-delete';

describe('ShipmentsDataDelete', () => {
  let component: ShipmentsDataDelete;
  let fixture: ComponentFixture<ShipmentsDataDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentsDataDelete],
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmentsDataDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
