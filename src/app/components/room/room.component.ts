import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  @Input() id:number = 0;
  @Input() name:string = '';
  @Input() capacity:string = '';
  @Input() location:string = '';
  @Input() checked:boolean = false;
}
