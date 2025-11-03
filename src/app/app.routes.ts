import { Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list';
import { EmployeeAddComponent } from './pages/employee-add/employee-add';
import { EmployeeEditComponent } from './pages/employee-edit/employee-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'add', component: EmployeeAddComponent },
  { path: 'edit/:id', component: EmployeeEditComponent },
  { path: '**', redirectTo: 'employees' }
];
