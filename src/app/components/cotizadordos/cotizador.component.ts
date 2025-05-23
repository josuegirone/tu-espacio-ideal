import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-cotizadordos',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './cotizadordos.component.html',
  styleUrls: ['./cotizadordos.component.css']
})
export class CotizadordosComponent {
  precioRenta: number = 0;
  deposito: number = 0;
  duracion: number = 0;
  tipoPropiedad: string = '';

  totalContrato: string = '0';
  serviciosEstimados: string = '0';
  rentaMensualFinal: string = '0';

  constructor(private route: ActivatedRoute) {
    const precioParam = this.route.snapshot.paramMap.get('precio');
    if (precioParam) {
      this.precioRenta = parseFloat(precioParam);
    }
  }

  calcularRenta(): void {
    if (this.precioRenta && this.deposito && this.duracion) {
      const totalContratoCalc = (this.precioRenta * this.duracion) + this.deposito;
      const servicios = this.precioRenta * 0.10;
      const rentaFinal = this.precioRenta + servicios;

      this.totalContrato = totalContratoCalc.toFixed(2);
      this.serviciosEstimados = servicios.toFixed(2);
      this.rentaMensualFinal = rentaFinal.toFixed(2);
    }
  }

  limpiarCampos(): void {
    this.precioRenta = 0;
    this.deposito = 0;
    this.duracion = 0;
    this.tipoPropiedad = '';
    this.totalContrato = '0';
    this.serviciosEstimados = '0';
    this.rentaMensualFinal = '0';
  }

  generarPDF(): void {
    const doc = new jsPDF();

    // Fondo
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F');

    // Encabezado azul
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
    doc.text('Cotización de Renta Mensual', 105, 35, { align: 'center' });

    // Datos básicos
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(15, 45, 180, 40, 3, 3, 'F');
    doc.setFontSize(12);
    doc.setTextColor(20, 20, 20);
    doc.text(`Precio mensual de renta: Q ${this.precioRenta.toFixed(2)}`, 20, 55);
    doc.text(`Depósito de garantía: Q ${this.deposito.toFixed(2)}`, 20, 62);
    doc.text(`Duración del contrato: ${this.duracion} meses`, 120, 55);
    doc.text(`Tipo de propiedad: ${this.tipoPropiedad || 'N/D'}`, 120, 62);

    // Sección resumen
    doc.setFillColor(255, 193, 7);
    doc.roundedRect(15, 95, 180, 60, 5, 5, 'F');
    doc.setFontSize(13);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumen del Contrato de Renta', 105, 105, { align: 'center' });

    // Detalle resumen
    doc.setFontSize(12);
    const labels = [
      'Costo total del contrato:',
      'Servicios estimados mensuales:',
      'Total mensual aproximado:'
    ];
    const values = [
      `Q ${this.totalContrato}`,
      `Q ${this.serviciosEstimados}`,
      `Q ${this.rentaMensualFinal}`
    ];

    let y = 120;
    doc.setFont('helvetica', 'normal');
    for (let i = 0; i < labels.length; i++) {
      doc.text(labels[i], 25, y);
      doc.text(values[i], 180, y, { align: 'right' });
      y += 13;
    }

    // Mensaje final
    doc.setFillColor(40, 167, 69);
    doc.roundedRect(15, 165, 180, 18, 5, 5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('¡Tu nuevo espacio te está esperando, contáctanos hoy mismo!', 105, 177, { align: 'center' });

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.setFont('helvetica', 'italic');
    doc.text('Gracias por elegir a Tu Espacio Ideal, estamos contigo en cada paso.', 105, 275, { align: 'center' });
    doc.text('Nota Importante: Esta cotización tiene una vigencia de siete (7) días calendario', 105, 280, { align: 'center' });
    doc.text('a partir de la fecha de emisión. Los precios, condiciones y disponibilidad están sujetos a cambios sin previo aviso.', 105, 285, { align: 'center' });

    doc.save('cotizacion-renta.pdf');
  }
}
