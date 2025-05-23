import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';  // Firebase Database import
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private db: AngularFireDatabase) { }

  // Obtener citas y datos relacionados con las propiedades
  getAppointments(): Observable<any[]> {
    return this.db.list('agendarvisitaServiceForms').snapshotChanges();  // Lee desde 'agendarvisitaServiceForms'
  }

  // Obtener propiedades desde 'items'
  getProperties(): Observable<any[]> {
    return this.db.list('items').snapshotChanges();  // Lee desde 'items' para las propiedades
  }

  // Eliminar una cita
  deleteAppointment(id: string): Promise<void> {
    return this.db.list('agendarvisitaServiceForms').remove(id);
  }
}
