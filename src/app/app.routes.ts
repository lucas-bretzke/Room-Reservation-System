import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { RoomRegistrationComponent } from './components/room-registration/room-registration.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { ReservationComponent } from './reservation/reservation.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'rooms', component: RoomListComponent },
    { path: 'room-registration', component: RoomRegistrationComponent },
    { path: 'room-registration/:id', component: RoomRegistrationComponent },
    { path: 'reservation', component: ReservationComponent }
];
