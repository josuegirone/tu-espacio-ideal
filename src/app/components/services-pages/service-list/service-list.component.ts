import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-service-list',
  standalone: true,
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  imports: [RouterModule]
})

export class ServiceListComponent {
}
