import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDataPost } from './inventory-data-post';

describe('InventoryDataPost', () => {
  let component: InventoryDataPost;
  let fixture: ComponentFixture<InventoryDataPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryDataPost],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryDataPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
