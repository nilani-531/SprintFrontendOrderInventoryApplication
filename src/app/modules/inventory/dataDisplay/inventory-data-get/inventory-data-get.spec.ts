import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDataGet } from './inventory-data-get';

describe('InventoryDataGet', () => {
  let component: InventoryDataGet;
  let fixture: ComponentFixture<InventoryDataGet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryDataGet],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryDataGet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
