import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDataPut } from './inventory-data-put';

describe('InventoryDataPut', () => {
  let component: InventoryDataPut;
  let fixture: ComponentFixture<InventoryDataPut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryDataPut],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryDataPut);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
