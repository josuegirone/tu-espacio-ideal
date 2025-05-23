import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  userType: string = 'Cliente';

  constructor(private router: Router, private formService: FormService) {}

  // Método llamado al enviar el formulario
  async onSubmit() {
    const isValidUser = await this.formService.validateUser(this.email, this.password, this.userType);
    if (isValidUser) {
      if (this.userType === 'Administrador') {
        this.router.navigate(['/property-detail']); // Página para administradores
      } else if (this.userType === 'Cliente') {
        this.router.navigate(['/menu']); // Página para clientes
      }
    } else {
      alert('Credenciales incorrectas. Inténtalo nuevamente.');
    }
  }


}

