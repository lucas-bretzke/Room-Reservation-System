import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RoomComponent],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar salas. Por favor, tente novamente.';
        this.isLoading = false;
      }
    });
  }

  deleteRoom(id: number | undefined): void {
    if (!id) {
      this.errorMessage = 'ID da sala inválido';
      return;
    }

    if (confirm('Tem certeza que deseja excluir esta sala?')) {
      this.isLoading = true;
      this.roomService.deleteRoom(id).subscribe({
        next: () => {
          this.rooms = this.rooms.filter(room => room.id !== id);
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir sala. Por favor, tente novamente.';
          this.isLoading = false;
        }
      });
    }
  }
} 