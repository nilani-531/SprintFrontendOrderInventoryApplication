import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAndInventoryDataPost } from './products-and-inventory-data-post';

describe('ProductsAndInventoryDataPost', () => {
  let component: ProductsAndInventoryDataPost;
  let fixture: ComponentFixture<ProductsAndInventoryDataPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsAndInventoryDataPost],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsAndInventoryDataPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
