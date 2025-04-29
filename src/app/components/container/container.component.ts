import { Component, Input } from '@angular/core';
import { RoomComponent } from '../room/room.component';
import { RoomService } from '../../services/room/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [RoomComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {
  @Input() titulo: string = 'Cadastro de salas';
  @Input() descricao: string = 'Cadastro de salas para reserva';

  constructor(
    private roomService: RoomService,
    private router: Router
  ) { }

  addItem(): void {
    this.router.navigate(['/room-registration']);
  }

  editItem(id: number): void {
    this.router.navigate(['/room-registration', id]);
  }
}