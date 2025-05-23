import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearNuevoAdministradorComponent } from './crear-nuevo-administrador.component';

describe('CrearNuevoAdministradorComponent', () => {
  let component: CrearNuevoAdministradorComponent;
  let fixture: ComponentFixture<CrearNuevoAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearNuevoAdministradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearNuevoAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
