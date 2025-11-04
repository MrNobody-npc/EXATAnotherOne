import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../model/employeeModel';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-add.html',
  styleUrls: ['./employee-add.scss']
})
export class EmployeeAdd {
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService, private router: Router) {}

  async save() {
  try {
    const result: any = await this.employeeService.employee_save(this.employee);
    console.log('Server response:', result);

    // Check message from backend
    if (result && result.message) {
      alert('✅ ' + result.message);
    } else {
      alert('✅ Employee added successfully!');
    }

    this.router.navigateByUrl('/employees');
  } catch (error) {
    console.error('❌ Error saving employee:', error);
    alert('❌ Failed to save employee');
  }
}

  cancel() {
    this.router.navigateByUrl('/employees');
  }
}
