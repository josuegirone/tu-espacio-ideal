import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadordosComponent } from './cotizador.component';
import { CotizadorComponent } from '../cotizador/cotizador.component';

describe('CotizadorComponent', () => {
  let component: CotizadorComponent;
  let fixture: ComponentFixture<CotizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CotizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
