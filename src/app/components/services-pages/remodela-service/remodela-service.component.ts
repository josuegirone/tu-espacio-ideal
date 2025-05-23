import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormService } from '../../../services/form.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-remodela-service',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl:'./remodela-service.component.html',
  styleUrls: ['./remodela-service.component.css']
})
export class RemodelaServiceComponent {
  formData = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    message: ''
  };

  constructor(private formService: FormService) {}

  submitRemodelaForm() {
    this.formService.submitRemodelaForm(this.formData)
      .then(() => {
        const templateParams = {
          title: 'Solicitud de Servicio de Remodelación',
          name: `${this.formData.firstName} ${this.formData.lastName}`,
          nombre: `${this.formData.firstName} ${this.formData.lastName}`,
          email: this.formData.email,
          phone: this.formData.phone,
          message: this.formData.message,
          mensaje: 'Hemos recibido tu solicitud. Un agente inmobiliario se contactará contigo para ver detalles y coordinar el proceso de remodelación.'
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
        console.error('Error al enviar el formulario de remodelación:', error);
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
