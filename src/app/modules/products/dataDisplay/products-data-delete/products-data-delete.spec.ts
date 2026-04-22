import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDataDelete } from './products-data-delete';

describe('ProductsDataDelete', () => {
  let component: ProductsDataDelete;
  let fixture: ComponentFixture<ProductsDataDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDataDelete],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsDataDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
