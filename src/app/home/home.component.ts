import { Component, OnInit } from '@angular/core';
import { ApiService } from '../modules/users/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sideBarStatus: boolean = false;
  userCount: number = 0;
  adminName: string = '';

  constructor(
    private userApi: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getTotalEmployeeCount();
    this.adminName = JSON.parse(sessionStorage.getItem('admin') || '').name;
  }

  toggleSideBar() {
    this.sideBarStatus = !this.sideBarStatus;
  }

  getTotalEmployeeCount() {
    this.userApi.getAllUsers().subscribe((res: any) => {
      this.userCount = res.length;
    });
  }

  updateAdminEvent(event: any): void {
    this.adminName = event;
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }
}
