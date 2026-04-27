import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryApiDisplay } from './inventory-api-display';

describe('InventoryApiDisplay', () => {
  let component: InventoryApiDisplay;
  let fixture: ComponentFixture<InventoryApiDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryApiDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryApiDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
  goBack() { this.router.navigate(['/api-dashboard']); }
