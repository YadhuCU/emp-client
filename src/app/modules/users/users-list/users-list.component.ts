import { Component, OnInit } from '@angular/core';
import { UserSchema } from '../models/userSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  page: number = 1;
  searchKey: string = '';
  allUsers: UserSchema[] = [];

  constructor(
    private api: ApiService,
    private toaster: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getAllUsersList();
  }

  getAllUsersList(): void {
    this.api.getAllUsers().subscribe({
      next: (result: any) => {
        this.allUsers = result;
      },
      error: (err: any) => console.log(err),
    });
  }

  removeUser(id: any): void {
    this.api.removeUser(id).subscribe((res: any) => {
      this.toaster.success('Deleted successfully');
      this.getAllUsersList();
    });
  }

  generatePdf(): void {
    const pdf = new jspdf();
    const head = [['EmpId', 'Username', 'Email', 'Status']];
    const body: any = [];

    this.allUsers.forEach((item) => {
      if (item.id != '1') {
        body.push([item.empId, item.name, item.email, item.status]);
      }
    });

    pdf.setFontSize(16);
    pdf.text('All Users List', 10, 10);

    autoTable(pdf, {
      head,
      body,
    });
    pdf.output('dataurlnewwindow');
    pdf.save('allUserslist.pdf');
  }

  sortById(): void {
    this.allUsers.sort(
      (user1: any, user2: any) => user1.empId?.localeCompare(user2.empId),
    );
  }
  sortByName(): void {
    this.allUsers.sort(
      (user1: any, user2: any) => user1.name?.localeCompare(user2.name),
    );
  }
}
