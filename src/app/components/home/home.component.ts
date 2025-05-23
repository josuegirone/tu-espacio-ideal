import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  mostrarAlerta(): void {
    alert("INGRESA A TU CUENTA PARA REALIZAR COTIZACIÓN");
  }

}



