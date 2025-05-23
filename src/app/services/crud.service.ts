import { Injectable } from '@angular/core';
import { Database, ref, set, push, onValue, remove, update, get } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface Item {
  id: string;     // El id es obligatorio
  name: string;
  address: string;
  price: number;
  image: string;
  categoria: string
}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private itemsRef: any;

  constructor(private db: Database) {
    this.itemsRef = ref(this.db, 'items');
  }

  // ✅ Obtener lista de propiedades como Observable
  getItems(): Observable<Item[]> {
    const itemsRef = ref(this.db, 'items');
    return new Observable((observer) => {
      onValue(itemsRef, (snapshot) => {
        const items: Item[] = [];
        snapshot.forEach((childSnapshot) => {
          const item = { id: childSnapshot.key!, ...childSnapshot.val() };
          items.push(item);
        });
        observer.next(items);
      });
    });
  }

  // ✅ Obtener una propiedad específica por ID
  getItemById(id: string): Promise<Item | null> {
    const itemRef = ref(this.db, `items/${id}`);
    return new Promise((resolve, reject) => {
      onValue(itemRef, (snapshot) => {
        if (snapshot.exists()) {
          const item = snapshot.val();
          resolve({ id, ...item });
        } else {
          resolve(null);
        }
      }, { onlyOnce: true });
    });
  }

  // ✅ Buscar el ID de una propiedad por su nombre
  findItemByName(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      onValue(this.itemsRef, (snapshot) => {
        let foundKey = '';
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().name === name) {
            foundKey = childSnapshot.key!;
          }
        });

        if (foundKey) {
          resolve(foundKey);
        } else {
          reject('Propiedad no encontrada');
        }
      }, { onlyOnce: true });
    });
  }

  // ✅ Agregar una nueva propiedad (requiere ID)
  addItem(item: Item) {
    const newItemRef = ref(this.db, `items/${item.id}`);
    return set(newItemRef, item);
  }

  // ✅ Actualizar propiedad existente
  updateItem(id: string, item: Item) {
    const itemRef = ref(this.db, `items/${id}`);
    return update(itemRef, {
      name: item.name,
      address: item.address,
      price: item.price,
      image: item.image,
      categoria: item.categoria
    });
  }

  // ✅ Eliminar propiedad por ID
  deleteItem(id: string) {
    const itemRef = ref(this.db, `items/${id}`);
    return remove(itemRef);
  }

}
