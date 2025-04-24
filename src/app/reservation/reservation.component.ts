import { Component } from '@angular/core';



@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})



export class ReservationComponent {

  onSubmit() {
    console.log("teste");
  }

}

export interface Reservation {
  id?: number;
  roomId: number;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
}