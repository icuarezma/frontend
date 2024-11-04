import { Component } from '@angular/core';
import {MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { routes } from '../../app.routes';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {

  menuItems = this.getMenuItems(routes);

  constructor(private router: Router) {}


  private getMenuItems(routes: any[]) : any[] {
    return routes
    .filter(route => route.path === 'dashboard' && route.children) // Solo la ruta 'dashboard'
    .flatMap(route => route.children) // Obtiene las rutas hijas
    .filter(childRoute => childRoute.data && childRoute.data.icon && childRoute.data.label) // Filtra las rutas hijas con icono y etiqueta
    .map(childRoute => ({
      path: childRoute.path,
      icon: childRoute.data.icon,
      label: childRoute.data.label
    }));
  }

}
