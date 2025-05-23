import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-cotizadortres',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './cotizadortres.component.html',
  styleUrls: ['./cotizadortres.component.css']
})
export class CotizadortresComponent {
  precioPorNoche: number = 350;
  tarifaLimpieza: number = 150;
  cantidadDias: number = 1;
  tipoPropiedad: string = '';
  incluyeLimpieza: boolean = true;

  totalNoches: string = '0';
  totalEstadia: string = '0';

  constructor(private route: ActivatedRoute) {
    const precioParam = this.route.snapshot.queryParamMap.get('precio');
    if (precioParam) {
      this.precioPorNoche = parseFloat(precioParam);
    }
  }

  calcularEstadia(): void {
    if (this.cantidadDias >= 1 && this.cantidadDias <= 7) {
      const totalNochesCalc = this.precioPorNoche * this.cantidadDias;
      const limpieza = this.incluyeLimpieza ? 150 : 0;
      const totalEstadiaCalc = totalNochesCalc + limpieza;

      this.tarifaLimpieza = limpieza;
      this.totalNoches = totalNochesCalc.toFixed(2);
      this.totalEstadia = totalEstadiaCalc.toFixed(2);
    } else {
      alert('La estadía debe ser entre 1 y 7 días.');
    }
  }

  limpiarCampos(): void {
    this.cantidadDias = 1;
    this.tipoPropiedad = '';
    this.incluyeLimpieza = true;
    this.tarifaLimpieza = 150;
    this.totalNoches = '0';
    this.totalEstadia = '0';
  }

  generarPDF(): void {
    const doc = new jsPDF();

    // Fondo
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F');

    // Encabezado
    doc.setFillColor(0, 123, 255);
    doc.rect(0, 0, 210, 25, 'F');
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Tu Espacio Ideal', 105, 16, { align: 'center' });

    // Título
    doc.setFontSize(15);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text('Cotización de Estancia Temporal', 105, 35, { align: 'center' });

    // Datos básicos
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(15, 45, 180, 45, 3, 3, 'F');
    doc.setFontSize(12);
    doc.setTextColor(20, 20, 20);
    doc.text(`Precio por noche: Q ${this.precioPorNoche.toFixed(2)}`, 20, 55);
    doc.text(`¿Incluye limpieza?: ${this.incluyeLimpieza ? 'Sí' : 'No'}`, 20, 62);
    doc.text(`Tarifa limpieza: Q ${this.tarifaLimpieza.toFixed(2)}`, 20, 69);
    doc.text(`Días de estadía: ${this.cantidadDias}`, 120, 55);
    doc.text(`Tipo de propiedad: ${this.tipoPropiedad || 'N/D'}`, 120, 62);

    // Resumen
    doc.setFillColor(255, 193, 7);
    doc.roundedRect(15, 100, 180, 60, 5, 5, 'F');
    doc.setFontSize(13);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumen de la Estancia', 105, 110, { align: 'center' });

    const labels = [
      'Subtotal por noches:',
      'Tarifa de limpieza:',
      'Total a pagar:'
    ];
    const values = [
      `Q ${this.totalNoches}`,
      `Q ${this.tarifaLimpieza.toFixed(2)}`,
      `Q ${this.totalEstadia}`
    ];

    let y = 125;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    for (let i = 0; i < labels.length; i++) {
      doc.text(labels[i], 25, y);
      doc.text(values[i], 180, y, { align: 'right' });
      y += 13;
    }

    // Mensaje
    doc.setFillColor(40, 167, 69);
    doc.roundedRect(15, 170, 180, 18, 5, 5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('¡Esperamos que disfrutes tu estancia con nosotros!', 105, 182, { align: 'center' });

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.setFont('helvetica', 'italic');
    doc.text('Gracias por elegir a Tu Espacio Ideal, estamos contigo en cada paso.', 105, 275, { align: 'center' });
    doc.text('Nota: Esta cotización tiene validez de 7 días a partir de su emisión.', 105, 280, { align: 'center' });
    doc.text('Precios y condiciones sujetos a cambio sin previo aviso.', 105, 285, { align: 'center' });

    doc.save('cotizacion-estadia.pdf');
  }
}
