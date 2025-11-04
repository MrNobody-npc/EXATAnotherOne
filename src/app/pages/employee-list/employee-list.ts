import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../model/employeeModel';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  async loadEmployees() {
    try {
      const data = await this.employeeService.employee_getAll();
      this.employees = data ?? []; // ✅ fallback in case undefined
    } catch (error) {
      console.error('Error loading employees:', error);
      this.employees = [];
    }
  }

  goToAddEmployee() {
    this.router.navigate(['/add']);
  }

  editEmployee(id?: number) {
    if (!id) return;
    this.router.navigate(['/edit', id]);
  }

  async deleteEmployee(id?: number) {
  if (id === undefined) {
    console.error('❌ No ID provided for deletion.');
    return;
  }

  if (!confirm('Are you sure you want to delete this employee?')) return;

  try {
    const result: any = await this.employeeService.employee_remove(id);
    if (result && result.message) {
      alert('✅ ' + result.message);
    } else {
      alert('✅ Employee deleted successfully!');
    }

    this.loadEmployees();
  } catch (error) {
    console.error('Error deleting employee:', error);
    alert('❌ Failed to delete employee');
  }
}

}
