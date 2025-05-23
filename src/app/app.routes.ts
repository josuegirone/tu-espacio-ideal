import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ServiceListComponent } from './components/services-pages/service-list/service-list.component';
import { RentalServiceComponent } from './components/services-pages/rental-service/rental-service.component';
import { PhotographyServiceComponent } from './components/services-pages/photography-service/photography-service.component';
import { LegalServiceComponent } from './components/services-pages/legal-service/legal-service.component';
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { HeaderComponent } from './components/header/header.component';
import { RemodelaServiceComponent } from './components/services-pages/remodela-service/remodela-service.component';
import { AgendarVisitaServiceComponent } from './components/services-pages/agendarvisita-service/agendarvisita-service.component';
import { CrearNuevoAdministradorComponent } from './components/crear-nuevo-administrador/crear-nuevo-administrador.component';
import path from 'path';
import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { RentaComponent } from './components/renta/renta.component';
import { EstadiaComponent } from './components/estadia/estadis.component';
import { CotizadordosComponent } from './components/cotizadordos/cotizador.component';
import { CotizadortresComponent } from './components/cotizadortres/cotizador.component';
import { AdmincitasComponent } from './components/admincitas/admincitas.component';
import { AdminserviciosComponent } from './components/adminservicios/adminservicios.component';



export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'property/:id', component: PropertyDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'catalog', component: CatalogComponent},
  { path: 'services-list', component: ServiceListComponent},
  { path: 'admin', component: AdminPanelComponent },
  { path: 'rental-service', component: RentalServiceComponent },
  { path: 'photography-service', component: PhotographyServiceComponent },
  { path: 'legal-service', component: LegalServiceComponent },
  { path: 'cotizador/:precio', component: CotizadorComponent },
  { path: 'cotizadordos/:precio', component: CotizadordosComponent },
  { path: 'cotizadortres/:precio', component: CotizadortresComponent },
  { path: 'header', component: HeaderComponent},
  { path: 'property-detail', component: PropertyDetailComponent},
  { path: 'remodela-service', component: RemodelaServiceComponent},
  { path: 'agendarvisita-service', component: AgendarVisitaServiceComponent },
  { path: 'nuevo-admin', component: CrearNuevoAdministradorComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'renta', component: RentaComponent},
  { path: 'estadia', component: EstadiaComponent},
  { path: 'admincitas', component: AdmincitasComponent},
  { path: 'adminservicios', component: AdminserviciosComponent},

  { path: '**', redirectTo: '' } // Redirige a Home si no coincide ninguna ruta

];
