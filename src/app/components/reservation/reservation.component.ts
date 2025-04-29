import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { ReservationService } from '../../services/reservation.service';
import { Room } from '../../models/room.model';
import { Reservation } from '../../models/reservation.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup;
  rooms: Room[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private router: Router
  ) {
    this.reservationForm = this.fb.group({
      roomId: ['', Validators.required],
      checkInDate: ['', [Validators.required]],
      checkOutDate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadRooms();
  }

  private loadRooms(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar salas:', error);
        this.errorMessage = 'Erro ao carregar salas disponíveis. Por favor, tente novamente.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.isLoading || !this.reservationForm.valid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValue = this.reservationForm.value;
    
    // Validação das datas
    const checkInDate = new Date(formValue.checkInDate);
    const checkOutDate = new Date(formValue.checkOutDate);
    
    if (checkInDate >= checkOutDate) {
      this.errorMessage = 'A data de check-out deve ser posterior à data de check-in.';
      this.isLoading = false;
      return;
    }

    const reservationData: Reservation = {
      reservationDate: new Date().toISOString(),
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      roomId: Number(formValue.roomId),
      userId: 1,
      status: 'Pending'
    };

    console.log('Dados da reserva:', reservationData);

    this.reservationService.create(reservationData).subscribe({
      next: () => {
        this.successMessage = 'Reserva realizada com sucesso!';
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/rooms']);
        }, 2000);
      },
      error: (error: any) => {
        console.error('Erro ao criar reserva:', error);
        this.errorMessage = error.error?.message || 'Erro ao realizar reserva. Por favor, tente novamente.';
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/rooms']);
  }

  get formControls() {
    return this.reservationForm.controls;
  }
} 