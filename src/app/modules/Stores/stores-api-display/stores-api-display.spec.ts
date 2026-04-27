import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresApiDisplay } from './stores-api-display';

describe('StoresApiDisplay', () => {
  let component: StoresApiDisplay;
  let fixture: ComponentFixture<StoresApiDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoresApiDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(StoresApiDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
  goBack() { this.router.navigate(['/api-dashboard']); }
