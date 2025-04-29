import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RoomRequest {
  id: string;
  name: string;
  capacity: string;
  location: string;
}

export interface RoomResponse {
  id: number;
  capacity: number;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = `${environment.apiUrl}/rooms`;
  constructor(private http: HttpClient ) { }

  create(room: RoomRequest): Observable<RoomResponse> {
    const roomToSend = {
      ...room,
      capacity: parseInt(room.capacity, 10)
    };
    return this.http.post<RoomResponse>(this.apiUrl, roomToSend);
  }

  update(id: number, room: RoomRequest): Observable<any> {
    const roomToSend = {
      ...room,
      capacity: parseInt(room.capacity, 10)
    };
    return this.http.put(`${this.apiUrl}/${id}`, roomToSend);
  }
}