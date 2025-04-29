import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { RoomRegistrationComponent } from './components/room-registration/room-registration.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { ReservationComponent } from './components/reservation/reservation.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'rooms', component: RoomListComponent },
    { path: 'register-room', component: RoomRegistrationComponent },
    { path: 'register-room/:id', component: RoomRegistrationComponent },
    { path: 'reservations', component: ReservationComponent }
];
