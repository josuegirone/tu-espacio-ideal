import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true, // Marcamos el componente como standalone
  imports: [RouterModule] // Importamos RouterModule para habilitar routerLink en el componente standalone
})
export class MenuComponent {

  constructor(private router: Router) {}

  // Función para redirigir al usuario
  goToPage(page: string): void {
    if (page === 'login') {
      this.router.navigate(['/login']); // Asegúrate de tener esta ruta configurada en app.routes.ts
    } else if (page === 'catalog') {
      this.router.navigate(['/catalog']);
    } else if (page === 'planear') {
      this.router.navigate(['/planear-estadia']);
    }
  }

  // Efecto hover para las imágenes
  onMouseOver(option: string): void {
    const img = document.getElementById(`${option}-img`);
    if (img) {
      img.style.transform = 'scale(1.1)';
    }
  }

  // Restaurar la imagen cuando el mouse sale
  onMouseLeave(option: string): void {
    const img = document.getElementById(`${option}-img`);
    if (img) {
      img.style.transform = 'scale(1)';
    }
  }
}
