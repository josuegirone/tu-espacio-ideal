import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Estructura de datos del formulario de registro
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    userRole: 'Cliente' // Valor predeterminado
  };

  constructor(private formService: FormService) {}

  // Método para enviar el formulario de registro
  submitForm() {
    // Verifica si las contraseñas coinciden
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, intenta nuevamente.');
      return;
    }

    // Llama al método de servicio para enviar los datos del registro
    this.formService.submitUserRegistration(this.formData)
      .then(() => {
        alert('Registro completado exitosamente');
        this.resetForm();
      })
      .catch((error: any) => {
        console.error('Error al registrar el usuario:', error);
      });
  }

  // Método para restablecer el formulario después de enviarlo
  resetForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      userRole: 'Cliente'
    };
  }
}
