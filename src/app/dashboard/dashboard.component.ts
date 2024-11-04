import { Component } from '@angular/core';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidenavComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

}
