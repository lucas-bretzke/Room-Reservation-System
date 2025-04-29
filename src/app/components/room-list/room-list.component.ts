import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoomService } from '../../services/room/room.service';
import { Room } from '../../models/room.model';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RoomComponent],
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];
  loading = true;
  error: string | null = null;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.loading = true;
    this.error = null;
    
    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Erro ao carregar as salas';
        this.loading = false;
      }
    });
  }

  deleteRoom(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta sala?')) {
      this.roomService.deleteRoom(id).subscribe({
        next: () => this.loadRooms(),
        error: (error) => {
          this.error = error.error?.message || 'Erro ao excluir a sala';
        }
      });
    }
  }
} 