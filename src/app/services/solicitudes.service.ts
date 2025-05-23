import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesServiciosService {

  private dbPath = '/solicitudes'; // Ruta en Firebase donde se almacenan las solicitudes

  constructor(private db: AngularFireDatabase) {}

  // Obtener solicitudes por tipo (legal, photography, remodela, rental)
  getSolicitudes(serviceType: string): Observable<any[]> {
    return this.db.list(`${this.dbPath}/${serviceType}`).valueChanges();
  }

  // Eliminar una solicitud de Firebase
  deleteSolicitud(id: string, serviceType: string): Promise<void> {
    return this.db.list(`${this.dbPath}/${serviceType}`).remove(id);
  }
}
