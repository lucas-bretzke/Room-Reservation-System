import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = `${environment.apiUrl}/reservations`;

  constructor(private http: HttpClient) { }

  create(reservation: Reservation): Observable<Reservation> {
    const reservationData = {
      roomId: Number(reservation.roomId),
      userId: 1, // ID do usuário teste
      reservationDate: new Date().toISOString(), // Data atual da reserva
      checkInDate: new Date(reservation.checkInDate).toISOString(),
      checkOutDate: new Date(reservation.checkOutDate).toISOString(),
      status: 'Pending' // Status inicial da reserva
    };

    return this.http.post<Reservation>(this.apiUrl, reservationData);
  }

  update(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${id}`, reservation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }
} 