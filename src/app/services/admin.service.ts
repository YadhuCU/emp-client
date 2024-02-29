import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  SERVER_URL: string = 'https://emp-server-kd0m.onrender.com';

  constructor(private http: HttpClient) {}

  getAdminDetails() {
    return this.http.get(`${this.SERVER_URL}/users/1`);
  }

  updateAdmin(data: any) {
    return this.http.put(`${this.SERVER_URL}/users/1`, data);
  }

  isLogedIn(): boolean {
    return !!sessionStorage.getItem('admin');
  }
}
