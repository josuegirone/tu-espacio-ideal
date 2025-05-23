import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminserviciosComponent } from './adminservicios.component';





describe('PropertyDetailComponent', () => {
  let component: AdminserviciosComponent;
  let fixture: ComponentFixture<AdminserviciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminserviciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminserviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
