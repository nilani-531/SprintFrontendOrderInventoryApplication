import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsDataPost } from './shipments-data-post';

describe('ShipmentsDataPost', () => {
  let component: ShipmentsDataPost;
  let fixture: ComponentFixture<ShipmentsDataPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentsDataPost],
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmentsDataPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
