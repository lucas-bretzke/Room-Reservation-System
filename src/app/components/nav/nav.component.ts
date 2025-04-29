import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  nomeProjeto = 'QuickRooms';
  isMenuOpen = false;

  constructor(private router: Router) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
