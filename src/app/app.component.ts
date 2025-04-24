import { Component } from '@angular/core';
import { ReservationComponent } from "./reservation/reservation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReservationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tananam';
}
