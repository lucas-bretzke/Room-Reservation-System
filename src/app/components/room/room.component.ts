import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-room',
  standalone: true,
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  @Input() id = 0;
  @Input() name = '';
  @Input() capacity = 0;
  @Input() location = '';
  @Input() checked = false;
}
