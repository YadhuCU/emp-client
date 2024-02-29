import { Component, OnInit } from '@angular/core';
import { UserSchema } from '../models/userSchema';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  user: UserSchema = {};

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      const { id } = res;
      this.getUserDetails(id);
    });
  }

  getUserDetails(id: string): void {
    this.api.getUser(id).subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
    });
  }

  cancel(id: any): void {
    this.getUserDetails(id);
  }

  update(id: any): void {
    this.api.updateUser(id, this.user).subscribe({
      next: (res) => {
        this.toaster.success('Updated successfully');
        setTimeout(() => {
          this.router.navigateByUrl('/users');
        }, 400);
      },
      error: (err) => this.toaster.warning(err.message),
    });
  }
}
