import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../../services/form.service';
import { CrudService } from '../../../services/crud.service';
import { getDatabase, onValue, ref } from 'firebase/database';
import { MY_DATE_FORMATS } from '../../../../date-format';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-agendarvisita-service',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './agendarvisita-service.component.html',
  styleUrls: ['./agendarvisita-service.component.css'],
  providers: [
    FormService,
    CrudService,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AgendarVisitaServiceComponent implements OnInit {
  formData = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    message: '',
    visitDate: '',
    categoria: ''
  };

  ocupadas: string[] = [];
  fechasCargadas = false;
  selectedProperty: any = null;

  constructor(
    private formService: FormService,
    private crudService: CrudService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get property details from the query parameters
    this.route.queryParams.subscribe(params => {
      this.selectedProperty = {
        address: params['address'],
        id: params['id'],
        image: params['image'],
        name: params['name'],
        price: params['price'],
        categoria: params['categoria']
      };
    });

    const db = getDatabase();
    const visitasRef = ref(db, 'agendarvisitaServiceForms');

    onValue(visitasRef, (snapshot) => {
      const data = snapshot.val();
      this.ocupadas = [];

      if (data) {
        for (let key in data) {
          const fecha = data[key].visitDate?.trim();
          if (fecha && !this.ocupadas.includes(fecha)) {
            this.ocupadas.push(fecha);
          }
        }
      }

      this.fechasCargadas = true;
    });
  }

  submitForm() {
    if (!this.fechasCargadas) {
      alert('Cargando disponibilidad...');
      return;
    }

    if (!this.formData.visitDate) {
      alert('Debe seleccionar una fecha de visita');
      return;
    }

    let visitDateFormatted = '';
    try {
      const parsedDate = new Date(this.formData.visitDate);
      if (!isNaN(parsedDate.getTime())) {
        const day = String(parsedDate.getDate()).padStart(2, '0');
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const year = parsedDate.getFullYear();
        visitDateFormatted = `${day}/${month}/${year}`;
      } else {
        throw new Error('Fecha inválida');
      }
    } catch {
      alert('La fecha ingresada no es válida.');
      return;
    }

    if (this.ocupadas.includes(visitDateFormatted)) {
      alert('La fecha seleccionada ya está ocupada. Por favor, elige otra.');
      return;
    }

    if (this.isPastDate(new Date(this.formData.visitDate))) {
      alert('No puedes agendar una visita en una fecha pasada.');
      return;
    }

    const formattedFormData = {
      ...this.formData,
      visitDate: visitDateFormatted,
      propiedad: {
        id: this.selectedProperty?.id || '',
        name: this.selectedProperty?.name || '',
        address: this.selectedProperty?.address || '',
        price: this.selectedProperty?.price || 0,
        image: this.selectedProperty?.image || '',
        categoria: this.selectedProperty?.categoria || ''
      }
    };

    this.formService.submitAgendarvisitaForm(formattedFormData)
      .then(() => {
        const templateParams = {
          title: 'Agendamiento de visita',
          name: `${this.formData.firstName} ${this.formData.lastName}`,
          nombre: `${this.formData.firstName} ${this.formData.lastName}`,
          mensaje: 'Gracias por tu preferencia. Nos pondremos en contacto contigo.',
          email: this.formData.email,
          visitDate: visitDateFormatted,
          property_name: this.selectedProperty?.name || '',
          property_address: this.selectedProperty?.address || '',
          property_price: this.selectedProperty?.price || '',
          property_categoria: this.selectedProperty?.categoria || ''
        };

        emailjs.send(
          'service_5eulutc',
          'template_u1osgxj',
          templateParams,
          'KVUHtYrjB9dDxmFlc'
        ).then(() => {
          alert('✅ Formulario enviado y correo notificado al cliente.');
          this.resetForm();
        }).catch((error) => {
          console.error('Error al enviar correo:', error);
          alert('Formulario guardado, pero no se pudo enviar el correo.');
          this.resetForm();
        });
      })
      .catch(err => {
        console.error('Error al enviar formulario:', err);
        alert('Hubo un error. Intenta de nuevo.');
      });
  }

  resetForm() {
    this.formData = {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      message: '',
      visitDate: '',
      categoria: ''
    };
  }

  isPastDate = (d: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  filterDates = (d: Date | null): boolean => {
    if (!this.fechasCargadas || !d) return false;

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const dateStr = `${day}/${month}/${year}`;

    return !this.ocupadas.includes(dateStr) && !this.isPastDate(d);
  };

  dateClass = (d: Date): string => {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const dateStr = `${day}/${month}/${year}`;

    if (this.ocupadas.includes(dateStr)) return 'ocupada-fecha';
    if (this.isPastDate(d)) return 'fecha-pasada';
    return 'disponible-fecha';
  };
}
