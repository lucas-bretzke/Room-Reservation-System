import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RoomService, RoomRequest } from '../../services/room/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './room-registration.component.html',
  styleUrl: './room-registration.component.css'
})
export class RoomRegistrationComponent implements OnInit {
  roomForm: FormGroup;
  isEditMode: boolean = false;
  roomId: number | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    public router: Router,
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
      }
    });
  }

  onSubmit(): void {
    if (this.isSubmitting) return;
    
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;
    
    if (this.roomForm.valid) {
      const roomData: RoomRequest = {
        id: this.isEditMode && this.roomId ? this.roomId.toString() : '0',
        name: this.roomForm.get('name')?.value,
        capacity: this.roomForm.get('capacity')?.value,
        location: this.roomForm.get('location')?.value
      };
      
      const observable = this.isEditMode && this.roomId
        ? this.roomService.update(this.roomId, roomData)
        : this.roomService.create(roomData);

      observable.subscribe({
        next: () => {
          this.successMessage = this.isEditMode 
            ? 'Sala atualizada com sucesso!' 
            : 'Sala cadastrada com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/rooms']);
          }, 2000);
        },
        error: (error) => {
          this.handleError(error);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      this.isSubmitting = false;
      this.markFormGroupTouched(this.roomForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private handleError(error: any): void {
    if (error.error?.error) {
      this.errorMessage = error.error.error;
    } else {
      this.errorMessage = 'Ocorreu um erro ao processar sua solicitação.';
    }
  }

  onCancel(): void {
    this.router.navigate(['/rooms']);
  }

  get formControls() {
    return this.roomForm.controls;
  }
} 