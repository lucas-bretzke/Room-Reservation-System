import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RoomService, RoomRequest } from '../../services/room/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room-registration.component.html',
  styleUrl: './room-registration.component.css'
})
export class RoomRegistrationComponent implements OnInit {
  roomForm: FormGroup;
  isEditMode = false;
  roomId: number | null = null;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roomForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      location: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.roomId = +params['id'];
        this.loadRoomData();
      }
    });
  }

  loadRoomData(): void {
    this.isLoading = true;
    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        const room = rooms.find(r => r.id === this.roomId);
        if (room) {
          this.roomForm.patchValue({
            name: room.name,
            capacity: room.capacity.toString(),
            location: room.location
          });
        } else {
          this.errorMessage = 'Sala não encontrada';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erro ao carregar dados da sala';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.isLoading || this.roomForm.invalid) return;
    
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;
    
    const formValue = this.roomForm.value;
    const roomData: RoomRequest = {
      id: this.isEditMode ? this.roomId!.toString() : '0',
      name: formValue.name,
      capacity: formValue.capacity.toString(),
      location: formValue.location
    };

    const request = this.isEditMode
      ? this.roomService.update(this.roomId!, roomData)
      : this.roomService.create(roomData);

    request.subscribe({
      next: () => {
        this.successMessage = this.isEditMode ? 'Sala atualizada!' : 'Sala cadastrada!';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/rooms']), 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erro ao processar solicitação';
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/rooms']);
  }

  get formControls() {
    return this.roomForm.controls;
  }
} 