import { Routes } from '@angular/router';
import { SensorListComponent } from './sensors/sensor-list/sensor-list.component';
import { SensorsComponent } from './sensors/sensors.component';
import { SensorHistoryComponent } from './sensors/sensor-history/sensor-history.component';
import { CleanerAddComponent } from './cleaners/cleaner-add/cleaner-add.component';
import { CleanerListComponent } from './cleaners/cleaner-list/cleaner-list.component';
import { CleanersComponent } from './cleaners/cleaners.component';
import { TrashbinsListComponent } from './trashbins/trashbins-list/trashbins-list.component';
import { TrashbinsAddComponent } from './trashbins/trashbins-add/trashbins-add.component';
import { TrashbinsComponent } from './trashbins/trashbins.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { ShiftListComponent } from './shifts/shift-list/shift-list.component';
import { ShiftAddComponent } from './shifts/shift-add/shift-add.component';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { TrashbinEditComponent } from './trashbins/trashbin-edit/trashbin-edit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'sensors', component: SensorsComponent, canActivate: [AuthGuard] },
  { path: 'cleaners', component: CleanersComponent, canActivate: [AuthGuard] },
  { path: 'shifts', component: ShiftsComponent, canActivate: [AuthGuard] },
  {
    path: 'view/shifts',
    component: ShiftListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add/shifts',
    component: ShiftAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'trashbins',
    component: TrashbinsComponent,
  },
  {
    path: 'view/sensors',
    component: SensorListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view/sensors/:id/history',
    component: SensorHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view/cleaners',
    component: CleanerListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add/cleaners',
    component: CleanerAddComponent,
    canActivate: [AuthGuard],
  },
  { path: 'view/trashbins', component: TrashbinsListComponent },
  {
    path: 'add/trashbins',
    component: TrashbinsAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/trashbins/:id',
    component: TrashbinEditComponent,
    canActivate: [AuthGuard],
  },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }, // Catch all route
];
