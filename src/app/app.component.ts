import { Component } from '@angular/core';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { LoginComponent } from "./components/login/login.component";
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CatalogComponent } from "./components/catalog/catalog.component";
import { ServiceListComponent } from "./components/services-pages/service-list/service-list.component";
import { RentalServiceComponent } from './components/services-pages/rental-service/rental-service.component';
import { PhotographyServiceComponent } from './components/services-pages/photography-service/photography-service.component';
import { LegalServiceComponent } from './components/services-pages/legal-service/legal-service.component';
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { RouterModule } from '@angular/router';
import { RemodelaServiceComponent } from './components/services-pages/remodela-service/remodela-service.component';
import { AgendarVisitaServiceComponent } from './components/services-pages/agendarvisita-service/agendarvisita-service.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,
  ], // Asegúrate de incluirlo aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PropiedadesApp';
}
