import { Injectable } from '@angular/core';
import { Database, ref, push, set, get, child } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private legalServiceDbRef: any;
  private rentalServiceDbRef: any;
  private photographyDBRef: any;
  private userRegistrationDbRef: any;
  private agendarvisitaDBRef: any;
  private remodelaDBRef: any;


  constructor(private db: Database) {
    this.legalServiceDbRef = ref(this.db, 'legalServiceForms');
    this.rentalServiceDbRef = ref(this.db, 'rentalServiceForms');
    this.photographyDBRef = ref(this.db, 'photographyServiceForms');
    this.remodelaDBRef = ref(this.db, 'remodelaServiceForms');
    this.agendarvisitaDBRef = ref(this.db, 'agendarvisitaServiceForms');

    this.userRegistrationDbRef = ref(this.db, 'users'); // Ruta para el formulario de Usuarios
  }

  // Método para enviar datos al formulario de Legal Services
  submitForm(data: any): Promise<void> {
    const newFormRef = push(this.legalServiceDbRef);
    return set(newFormRef, data);
  }

  // Método para enviar datos al formulario de Rental Services
  submitRentalForm(data: any): Promise<void> {
    const newFormRef = push(this.rentalServiceDbRef);
    return set(newFormRef, data);
  }

  submitPhotographyForm(data: any): Promise<void> {
    const newFormRef = push(this.photographyDBRef);
    return set(newFormRef, data);
  }

  submitUserRegistration(data: any): Promise<void> {
    const newFormRef = push(this.userRegistrationDbRef);
    return set(newFormRef, data);


  }
  submitRemodelaForm(data: any): Promise<void> {
    const newFormRef = push(this.remodelaDBRef);
    return set(newFormRef, data);
  }
  submitAgendarvisitaForm(data: any): Promise<void> {
    const newFormRef = push(this.agendarvisitaDBRef);
    return set(newFormRef, data);
  }




  // Método para validar usuario en el login
  async validateUser(username: string, password: string, userRole: string): Promise<boolean> {
    const snapshot = await get(child(this.userRegistrationDbRef, '/'));
    if (snapshot.exists()) {
      const users = snapshot.val();
      for (const userId in users) {
        const user = users[userId];
        if (
          user.username === username &&
          user.password === password &&
          user.userRole === userRole
        ) {
          return true;
        }
      }
    }
    return false;
  }

}
