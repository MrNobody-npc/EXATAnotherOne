import { Injectable } from '@angular/core';
import { AppConfig } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../config/initial_current';
import { Employee } from '../model/employeeModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public config: AppConfig = new AppConfig();  
  public initial_current: InitialCurrent = new InitialCurrent();  

  httpHeaders = new HttpHeaders({});
  options = { headers: this.httpHeaders };

  constructor(private http: HttpClient, private router: Router) {
    this.doGetInitialCurrent();
  }

  doGetInitialCurrent() {    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.LOCALInitial) || '{}');
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    });
    this.options = { headers: this.httpHeaders };
  }

  async employee_getAll() {
    return await this.http.get<any[]>(this.config.ApiUrl, this.options).toPromise();
  }

  async employee_getById(id: number) {
    return await this.http.get<any>(`${this.config.ApiUrl}/${id}`, this.options).toPromise();
  }

  async employee_save(model: Employee) {
    if (model.EMP_ID) {
      return await this.http.put(`${this.config.ApiUrl}/${model.EMP_ID}`, model, this.options).toPromise();
    } else {
      return await this.http.post(this.config.ApiUrl, model, this.options).toPromise();
    }
  }

  async employee_remove(id: number) {
    return await this.http.delete(`${this.config.ApiUrl}/${id}`, this.options).toPromise();
  }
}
