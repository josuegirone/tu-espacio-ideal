import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Database, ref, onValue, remove } from '@angular/fire/database';

@Component({
  selector: 'app-adminservicios',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './adminservicios.component.html',
  styleUrls: ['./adminservicios.component.css']
})
export class AdminserviciosComponent implements OnInit {
  db: Database = inject(Database);
  items: any[] = [];
  selectedCategory: string = 'rentalServiceForms'; // Categoría por defecto

  ngOnInit(): void {
    this.filtrarServicios(); // Cargar la categoría predeterminada
  }

  filtrarServicios(): void {
    const path = this.selectedCategory;

    if (path === 'all') {
      this.items = [];
      const paths = [
        'rentalServiceForms',
        'remodelaServiceForms',
        'photographyServiceForms',
        'legalServiceForms'
      ];
      paths.forEach((p) => {
        const refPath = ref(this.db, p);
        onValue(refPath, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const newItems = Object.entries(data).map(([key, cita]: any) => ({
              id: key,
              name: `${cita.firstName || ''} ${cita.lastName || ''}`.trim(),
              email: cita.email || 'Sin correo',
              phone: cita.phone || 'Sin número',
              message: cita.message || 'Sin mensaje',
              category: p
            }));
            this.items = [...this.items, ...newItems];
          }
        });
      });
    } else {
      const refPath = ref(this.db, path);
      onValue(refPath, (snapshot) => {
        const data = snapshot.val();
        this.items = [];
        if (data) {
          this.items = Object.entries(data).map(([key, cita]: any) => ({
            id: key,
            name: `${cita.firstName || ''} ${cita.lastName || ''}`.trim(),
            email: cita.email || 'Sin correo',
            phone: cita.phone || 'Sin número',
            message: cita.message || 'Sin mensaje',
            category: path
          }));
        }
      });
    }
  }

  generarLinkWhatsApp(item: any): string {
    const telefono = item.phone.replace(/\D/g, '');
    const numeroGuatemala = telefono.startsWith('502') ? telefono : `502${telefono}`;
    const mensaje = `Hola ${item.name}, gracias por tu interés. Te contactamos respecto a tu solicitud de servicio.`;
    return `https://wa.me/${numeroGuatemala}?text=${encodeURIComponent(mensaje)}`;
  }

  marcarComoAtendido(id: string) {
    if (!this.selectedCategory || this.selectedCategory === 'all') {
      alert('Debes seleccionar una categoría específica para eliminar.');
      return;
    }

    if (confirm('¿Confirmas que este servicio fue atendido?')) {
      const citaRef = ref(this.db, `${this.selectedCategory}/${id}`);
      remove(citaRef)
        .then(() => {
          alert('✅ Servicio marcado como atendido y eliminado.');
          this.items = this.items.filter(item => item.id !== id);
        })
        .catch(error => {
          console.error('Error al eliminar el registro:', error);
          alert('❌ Hubo un error al eliminar el registro.');
        });
    }
  }

  goBack(): void {
    window.history.back();
  }

  trackByKey(index: number, item: any): string {
    return item.id;
  }
}
