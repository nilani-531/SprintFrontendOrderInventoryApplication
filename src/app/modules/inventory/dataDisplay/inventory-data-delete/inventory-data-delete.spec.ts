import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDataDelete } from './inventory-data-delete';

describe('InventoryDataDelete', () => {
  let component: InventoryDataDelete;
  let fixture: ComponentFixture<InventoryDataDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryDataDelete],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryDataDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
