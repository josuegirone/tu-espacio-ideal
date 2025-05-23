import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmincitasComponent } from './admincitas.component';




describe('PropertyDetailComponent', () => {
  let component: AdmincitasComponent;
  let fixture: ComponentFixture<AdmincitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmincitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmincitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
