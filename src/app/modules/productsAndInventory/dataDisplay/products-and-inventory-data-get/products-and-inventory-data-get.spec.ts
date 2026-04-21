import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAndInventoryDataGet } from './products-and-inventory-data-get';

describe('ProductsAndInventoryDataGet', () => {
  let component: ProductsAndInventoryDataGet;
  let fixture: ComponentFixture<ProductsAndInventoryDataGet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsAndInventoryDataGet],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsAndInventoryDataGet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
