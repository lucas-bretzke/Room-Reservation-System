import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})

export class ReservationComponent {
  reservation = {
    roomId: 0,
    userId: 0,
    date: '',
    startTime: '',
    endTime: '',
  };

  constructor(private http: HttpClient) {
  }

  cancelId: number = 0;
  isAvailable: boolean | null = null;
  responseMessage: string = '';
  private apiUrl = 'https://localhost:5001/api/reservation';

  checkAvailability() {
    const params = new HttpParams()
      .set('salaId', this.reservation.roomId)
      .set('data', this.reservation.date)
      .set('inicio', this.reservation.startTime)
      .set('fim', this.reservation.endTime);

    this.http.get<{ disponivel: boolean }>('https://localhost:5001/disponivel', {params})
      .subscribe({
        next: (res) => {
          this.isAvailable = res.disponivel;
          this.responseMessage = '';
        },
        error: () => {
          this.responseMessage = 'Erro ao verificar disponibilidade.';
          this.isAvailable = null;
        }
      });
  }

  makeReservation() {
    this.http.post(`${this.apiUrl}/agendar`, this.reservation, {responseType: 'text'})
      .subscribe({
        next: (res) => {
          this.responseMessage = res;
          this.isAvailable = null;
        },
        error: () => this.responseMessage = 'Erro ao agendar reserva.'
      });
  }

  cancelReservation() {
    this.http.delete(`${this.apiUrl}/${this.cancelId}`, {responseType: 'text'})
      .subscribe({
        next: (res) => this.responseMessage = res,
        error: () => this.responseMessage = 'Erro ao cancelar reserva.'
      });
  }
}
