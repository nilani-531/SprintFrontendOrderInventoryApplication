import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDataPut } from './products-data-put';

describe('ProductsDataPut', () => {
  let component: ProductsDataPut;
  let fixture: ComponentFixture<ProductsDataPut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDataPut],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsDataPut);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
