import { ContainerComponent } from './components/container/container.component';
import { HomeComponent } from './page/home/home.component';
import { Routes } from '@angular/router';
import { RoomRegistrationComponent } from './components/room-registration/room-registration.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'rooms', component: ContainerComponent },
    { path: 'room-registration', component: RoomRegistrationComponent },
    { path: 'room-registration/:id', component: RoomRegistrationComponent }
];