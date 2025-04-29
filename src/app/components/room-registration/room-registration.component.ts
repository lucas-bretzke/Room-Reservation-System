import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.roomForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      location: ['', Validators.required]
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
    if (this.roomId) {
      this.isLoading = true;
      this.roomService.getRoom(this.roomId).subscribe({
        next: (room: Room) => {
          this.roomForm.patchValue({
            name: room.name,
            capacity: room.capacity.toString(),
            location: room.location
          });
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Erro ao carregar dados da sala';
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.roomForm.invalid || this.isSubmitting || this.isLoading) {
      return;
    }

    this.isSubmitting = true;
    this.isLoading = true;
    const roomData: Room = {
      ...this.roomForm.value,
      capacity: parseInt(this.roomForm.value.capacity, 10),
      status: 'available'
    };

    const request = this.isEditMode && this.roomId
      ? this.roomService.updateRoom(this.roomId, roomData)
      : this.roomService.createRoom(roomData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/rooms']);
        this.isSubmitting = false;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao salvar sala';
        this.isSubmitting = false;
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