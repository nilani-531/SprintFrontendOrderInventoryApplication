import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAndInventoryDataDelete } from './products-and-inventory-data-delete';

describe('ProductsAndInventoryDataDelete', () => {
  let component: ProductsAndInventoryDataDelete;
  let fixture: ComponentFixture<ProductsAndInventoryDataDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsAndInventoryDataDelete],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsAndInventoryDataDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
