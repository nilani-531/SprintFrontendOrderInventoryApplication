import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDataGet } from './products-data-get';

describe('ProductsDataGet', () => {
  let component: ProductsDataGet;
  let fixture: ComponentFixture<ProductsDataGet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDataGet],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsDataGet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
