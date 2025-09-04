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

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Default route
    { path: 'home', component: HomeComponent },
    { path: 'sensors', component: SensorsComponent },
    { path: 'cleaners', component: CleanersComponent },
    { path: 'trashbins', component: TrashbinsComponent },
    { path: 'view/sensors', component: SensorListComponent },
    { path: 'view/sensors/:id/history', component: SensorHistoryComponent },
    { path: 'view/cleaners', component: CleanerListComponent },
    { path: 'add/cleaners', component: CleanerAddComponent },
    { path: 'view/trashbins', component: TrashbinsListComponent },
    { path: 'add/trashbins', component: TrashbinsAddComponent },
    { path: '**', redirectTo: '' } // Catch all route
];
