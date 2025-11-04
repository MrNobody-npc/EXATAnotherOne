import { Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list';
import { EmployeeAdd } from './pages/employee-add/employee-add';
import { EmployeeEditComponent } from './pages/employee-edit/employee-edit';

export const routes: Routes = [
  { path: '', component: EmployeeListComponent },        // ✅ list page as root
  { path: 'add', component: EmployeeAdd },      // ✅ add page
  { path: 'edit/:id', component: EmployeeEditComponent },// ✅ edit page
  { path: '**', redirectTo: '' }                         // ✅ fallback
];
