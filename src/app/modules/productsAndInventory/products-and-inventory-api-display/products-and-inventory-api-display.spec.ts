import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAndInventoryApiDisplay } from './products-and-inventory-api-display';

describe('ProductsAndInventoryApiDisplay', () => {
  let component: ProductsAndInventoryApiDisplay;
  let fixture: ComponentFixture<ProductsAndInventoryApiDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsAndInventoryApiDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsAndInventoryApiDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
