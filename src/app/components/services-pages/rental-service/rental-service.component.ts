import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormService } from '../../../services/form.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-rental-service',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './rental-service.component.html',
  styleUrls: ['./rental-service.component.css']
})
export class RentalServiceComponent {
  formData = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    message: ''
  };

  constructor(private formService: FormService) {}

  submitForm() {
    this.formService.submitRentalForm(this.formData)
      .then(() => {
        const templateParams = {
          title: 'Solicitud de Servicio de Renta',
          name: `${this.formData.firstName} ${this.formData.lastName}`,
          nombre: `${this.formData.firstName} ${this.formData.lastName}`,
          email: this.formData.email,
          phone: this.formData.phone,
          message: this.formData.message,
          mensaje: 'Gracias por contactarnos. Te responderemos pronto.'
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
      .catch((error: any) => {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error. Intenta de nuevo.');
      });
  }

  resetForm() {
    this.formData = {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      message: ''
    };
  }
}
