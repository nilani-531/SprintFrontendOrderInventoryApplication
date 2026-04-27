import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsApiDisplay } from './shipments-api-display';

describe('ShipmentsApiDisplay', () => {
  let component: ShipmentsApiDisplay;
  let fixture: ComponentFixture<ShipmentsApiDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentsApiDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmentsApiDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
  goBack() { this.router.navigate(['/api-dashboard']); }
