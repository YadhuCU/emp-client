import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSchema } from '../models/userSchema';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  SERVER_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addUser(user: UserSchema) {
    return this.http.post(`${this.SERVER_URL}/users`, user);
  }

  getAllUsers() {
    return this.http.get(`${this.SERVER_URL}/users`);
  }

  getUser(id: string) {
    return this.http.get(`${this.SERVER_URL}/users/${id}`);
  }

  updateUser(id: string, user: UserSchema) {
    return this.http.put(`${this.SERVER_URL}/users/${id}`, user);
  }

  removeUser(id: string) {
    return this.http.delete(`${this.SERVER_URL}/users/${id}`);
  }
}
