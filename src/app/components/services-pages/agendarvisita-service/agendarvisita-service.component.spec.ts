import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendarVisitaServiceComponent } from './agendarvisita-service.component';





describe('AgendarVisitaServiceComponent', () => {
  let component: AgendarVisitaServiceComponent;
  let fixture: ComponentFixture<AgendarVisitaServiceComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendarVisitaServiceComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendarVisitaServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
