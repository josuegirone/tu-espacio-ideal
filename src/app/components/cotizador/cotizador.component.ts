import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent {
  precioTotal: number = 0;
  enganche: number = 0;
  interes: number = 6;
  plazo: number = 5;

  montoFinanciar: string = '0';
  cuotaMensual: string = '0';
  iusi: string = '0';
  seguroIncendio: string = '0';
  totalCuota: string = '0';

  constructor(private route: ActivatedRoute) {
    const precioParam = this.route.snapshot.paramMap.get('precio');
    if (precioParam) {
      this.precioTotal = parseFloat(precioParam);
    }
  }

  calcularCuotas(): void {
    if (this.precioTotal && this.enganche && this.interes && this.plazo) {
      const montoFinanciarCalc = this.precioTotal - this.enganche;
      const plazoMeses = this.plazo * 12;
      const tasaMensual = this.interes / 100 / 12;
      const cuotaMensualCalc = (montoFinanciarCalc * tasaMensual) /
        (1 - Math.pow(1 + tasaMensual, -plazoMeses));

      const iusiCalc = (this.precioTotal * 0.05) / 12;
      const seguroIncendioCalc = (this.precioTotal * 0.03) / 12;
      const totalCuotaCalc = cuotaMensualCalc + iusiCalc + seguroIncendioCalc;

      this.montoFinanciar = montoFinanciarCalc.toFixed(2);
      this.cuotaMensual = cuotaMensualCalc.toFixed(2);
      this.iusi = iusiCalc.toFixed(2);
      this.seguroIncendio = seguroIncendioCalc.toFixed(2);
      this.totalCuota = totalCuotaCalc.toFixed(2);
    }
  }

  limpiarCampos(): void {
    this.precioTotal = 0;
    this.enganche = 0;
    this.interes = 6;
    this.plazo = 5;
    this.montoFinanciar = '0';
    this.cuotaMensual = '0';
    this.iusi = '0';
    this.seguroIncendio = '0';
    this.totalCuota = '0';
  }

  generarPDF(): void {
    const doc = new jsPDF();

    // Fondo blanco principal
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F');

    // Encabezado superior color azul
    doc.setFillColor(0, 123, 255);
    doc.rect(0, 0, 210, 25, 'F');
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Tu Espacio Ideal', 105, 16, { align: 'center' });

    // Título documento
    doc.setFontSize(15);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text('Cotización de Cuotas Hipotecarias', 105, 35, { align: 'center' });

    // Datos básicos
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(15, 45, 180, 35, 3, 3, 'F');
    doc.setFontSize(12);
    doc.setTextColor(20, 20, 20);
    doc.text(`Precio Total: Q ${this.precioTotal.toFixed(2)}`, 20, 55);
    doc.text(`Enganche: Q ${this.enganche.toFixed(2)}`, 20, 62);
    doc.text(`Interés Anual: ${this.interes}%`, 120, 55);
    doc.text(`Plazo: ${this.plazo} años`, 120, 62);

    // Resumen financiamiento
    doc.setFillColor(255, 193, 7);
    doc.roundedRect(15, 85, 180, 80, 5, 5, 'F');
    doc.setFontSize(13);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumen del Financiamiento', 60, 95, { align: 'center' });

    // Detalle resumen
    doc.setFontSize(12);
    const labels = [
      'Monto a financiar:',
      'Cuota mensual nivelada:',
      'IUSI mensual:',
      'Seguro de incendio:',
      'Total cuota mensual:'
    ];
    const values = [
      `Q ${this.montoFinanciar}`,
      `Q ${this.cuotaMensual}`,
      `Q ${this.iusi}`,
      `Q ${this.seguroIncendio}`,
      `Q ${this.totalCuota}`
    ];

    let y = 108;
    doc.setFont('helvetica', 'normal');
    for (let i = 0; i < labels.length; i++) {
      doc.text(labels[i], 25, y);
      doc.text(values[i], 180, y, { align: 'right' });
      y += 13;
    }

    // Mensaje motivacional sin emojis
    doc.setFillColor(40, 167, 69);
    doc.roundedRect(15, 175, 180, 18, 5, 5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('¡Estás a un paso de hacer realidad tu sueño!', 105, 187, { align: 'center' });

 // Pie de página limpio
doc.setFontSize(10);
doc.setTextColor(80);
doc.setFont('helvetica', 'italic');
doc.text('Gracias por elegir a Tu Espacio Ideal, estamos contigo en cada paso.', 105, 275, { align: 'center' });
doc.text('Nota Importante: Esta cotización tiene una vigencia de siete (7) días calendario', 105, 280, { align: 'center' });
doc.text('a partir de la fecha de emisión. Los precios, condiciones y disponibilidad están sujetos a cambios sin previo aviso.', 105, 285, { align: 'center' });

    doc.save('cotizacion.pdf');
  }

}
