import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-edit.html',
  styleUrls: ['./employee-edit.scss']
})
export class EmployeeEditComponent implements OnInit {
  employee: any = {};
  id!: number;
  apiUrl = 'http://localhost:3000/api/employees'; // ✅ Make sure backend matches

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmployee();
  }

  loadEmployee() {
    this.http.get(`${this.apiUrl}/${this.id}`).subscribe({
      next: (data) => (this.employee = data),
      error: (err) => {
        console.error('Error loading employee:', err);
        alert('❌ Failed to load employee data.');
      }
    });
  }

  save() {
    this.http.put(`${this.apiUrl}/${this.id}`, this.employee).subscribe({
      next: () => {
        alert('✅ Employee updated successfully!');
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Error updating employee:', err);
        alert('❌ Failed to update employee.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
