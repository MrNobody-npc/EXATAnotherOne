import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: data => this.employees = data,
      error: err => console.error('Error fetching employees:', err)
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => this.loadEmployees(),
        error: err => console.error(err)
      });
    }
  }

  goToAddEmployee() {
    this.router.navigate(['/add']);
  }

  editEmployee(id: number) {
    this.router.navigate(['/edit', id]);
  }
}
