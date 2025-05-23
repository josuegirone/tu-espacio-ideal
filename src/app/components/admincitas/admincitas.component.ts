// admincitas.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Database, ref, onValue, remove } from '@angular/fire/database';

@Component({
  selector: 'app-admincitas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admincitas.component.html',
  styleUrls: ['./admincitas.component.css']
})
export class AdmincitasComponent implements OnInit {
  db: Database = inject(Database);
  items: any[] = [];
  selectedCategoria: string = 'ALL';
  allItems: any[] = [];

  ngOnInit(): void {
    const citasRef = ref(this.db, 'agendarvisitaServiceForms');

    onValue(citasRef, (snapshot) => {
      const data = snapshot.val();
      this.allItems = [];

      if (data) {
        this.allItems = Object.entries(data).map(([key, cita]: any) => {
          const propiedad = cita.propiedad || {};
          return {
            id: key,
            name: `${cita.firstName} ${cita.lastName}`.trim(),
            email: cita.email || 'Sin correo',
            phone: cita.phone || 'Sin número',
            date: cita.visitDate || 'Sin fecha',
            notes: cita.message || 'Sin mensaje',
            propiedad: {
              nombre: propiedad.name || 'Sin nombre',
              direccion: propiedad.address || 'Sin dirección',
              imagen: propiedad.image || '',
              categoria: propiedad.categoria || 'Sin categoría',
              precio: propiedad.price || 'Sin categoría'
            }
          };
        });
      }
      this.filtrarPorCategoria();
    });
  }

  filtrarPorCategoria() {
    if (this.selectedCategoria === 'ALL') {
      this.items = [...this.allItems];
    } else {
      this.items = this.allItems.filter(item =>
        item.propiedad.categoria?.toUpperCase() === this.selectedCategoria
      );
    }
  }

  generarLinkWhatsApp(item: any): string {
    const telefono = item.phone.replace(/\D/g, '');
    const numeroGuatemala = telefono.startsWith('502') ? telefono : `502${telefono}`;
    const mensaje = `Hola ${item.name}, esta es la información de tu cita:\n📅 Fecha: ${item.date}\n📍 Dirección: ${item.propiedad.direccion}\n🏠 Propiedad: ${item.propiedad.nombre}\n💰 Precio: Q${item.propiedad.precio}\n📝 Mensaje enviado: ${item.notes}`;
    return `https://wa.me/${numeroGuatemala}?text=${encodeURIComponent(mensaje)}`;
  }

  marcarComoAtendido(id: string) {
    if (confirm('¿Confirmas que esta cita ya fue atendida? Se eliminará del registro.')) {
      const citaRef = ref(this.db, `agendarvisitaServiceForms/${id}`);
      remove(citaRef)
        .then(() => {
          alert('✅ Cita marcada como atendida y eliminada.');
          this.items = this.items.filter(item => item.id !== id);
          this.allItems = this.allItems.filter(item => item.id !== id);
        })
        .catch(error => {
          console.error('Error al eliminar la cita:', error);
          alert('❌ Hubo un error al eliminar la cita.');
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
