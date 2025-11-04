import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../model/employeeModel';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-edit.html',
  styleUrls: ['./employee-edit.scss']
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee = new Employee();
  employeeId!: number;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    try {
      const data = await this.employeeService.employee_getById(this.employeeId);
      if (data) {
        this.employee = data;
      } else {
        alert('❌ Failed to load employee data');
        this.router.navigateByUrl('/employees');
      }
    } catch (error) {
      console.error('Error loading employee:', error);
      alert('❌ Failed to load employee data');
      this.router.navigateByUrl('/employees');
    }
  }

  async save() {
    try {
      const result: any = await this.employeeService.employee_save(this.employee);
    if (result && result.message) {
      alert('✅ ' + result.message);
    } else {
      alert('✅ Employee updated successfully!');
    }
      this.router.navigateByUrl('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('❌ Failed to update employee');
    }
  }

  cancel() {
    this.router.navigateByUrl('/employees');
  }
}
