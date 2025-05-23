import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CrudService, Item } from '../../services/crud.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent {
  newItem: Item = { id: '', name: '', address: '', price: 0, image: '', categoria: ''};  // id es mandatorio
  items: any;
  editing: boolean = false;  // Nueva propiedad para determinar si estamos editando

  constructor(private crudService: CrudService) {
    this.items = this.crudService.getItems();
  }

  addItem() {
    if (this.newItem.id && this.newItem.name && this.newItem.address && this.newItem.price && this.newItem.image && this.newItem.categoria) {
      if (this.editing) {
        // Actualizar la propiedad existente usando el id
        this.crudService.updateItem(this.newItem.id, {
          id: this.newItem.id,
          name: this.newItem.name,
          address: this.newItem.address,
          price: this.newItem.price,
          image: this.newItem.image,
          categoria: this.newItem.categoria
        }).then(() => {
          alert('Propiedad actualizada correctamente');
          this.resetForm();  // Limpiar el formulario
          this.refreshItems();  // Refrescar la lista de propiedades para evitar duplicados
        }).catch(error => {
          console.error('Error al actualizar:', error);
        });
      } else {
        // Agregar una nueva propiedad
        this.crudService.addItem(this.newItem).then(() => {
          alert('Propiedad agregada correctamente');
          this.resetForm();
          this.refreshItems();  // Refrescar la lista de propiedades después de agregar
        }).catch(error => {
          console.error('Error al agregar:', error);
        });
      }
    } else {
      alert('Todos los campos, incluido el ID, son obligatorios.');
    }
  }

  resetForm() {
    this.newItem = { id: '', name: '', address: '', price: 0, image: '', categoria:'' };  // Reiniciar con el id mandatorio
    this.editing = false;  // Cambiar de nuevo a modo agregar
  }

  refreshItems() {
    this.items = this.crudService.getItems();  // Recargar los ítems desde Firebase
  }

  trackByKey(index: number, item: any): string {
    return item.id;  // Usamos el campo 'id' como referencia única
  }

  editItem(item: any) {
    this.newItem = { ...item };  // Copia el ítem seleccionado en el formulario
    this.editing = true;  // Cambiar el modo a edición
  }

  deleteItem(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) {
      this.crudService.deleteItem(id).then(() => {
        alert('Propiedad eliminada correctamente');
        this.refreshItems();  // Refrescar la lista después de eliminar
      }).catch(error => {
        console.error('Error al eliminar:', error);
      });
    }
  }
}
