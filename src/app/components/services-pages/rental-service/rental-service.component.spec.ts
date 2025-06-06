import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalServiceComponent } from './rental-service.component';

describe('RentalServiceComponent', () => {
  let component: RentalServiceComponent;
  let fixture: ComponentFixture<RentalServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
