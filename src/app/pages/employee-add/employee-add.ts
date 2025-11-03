import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-add.html',
  styleUrls: ['./employee-add.scss']
})
export class EmployeeAddComponent {
  employee: any = {};
  apiUrl = 'http://localhost:3000/api/employees'; // ✅ Make sure backend matches this URL

  constructor(private http: HttpClient, private router: Router) {}

  save() {
    this.http.post(this.apiUrl, this.employee).subscribe({
      next: () => {
        alert('✅ Employee added successfully!');
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Error saving employee:', err);
        alert('❌ Failed to add employee. Check the console for details.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
