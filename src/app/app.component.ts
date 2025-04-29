import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerComponent } from "./components/container/container.component";
import { NavComponent } from './components/nav/nav.component';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, ContainerComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'room-reservation';

  constructor(private router: Router) {
  }

  navigateToReservation() {
    this.router.navigate(['/reservation']);
  }
}
