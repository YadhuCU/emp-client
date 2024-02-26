import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private toaster: ToastrService,
    private api: AdminService,
    private router: Router,
  ) {}

  login() {
    if (this.email && this.password) {
      // this.toaster.success('Proceed to API Call');
      this.api.getAdminDetails().subscribe({
        next: (res: any) => {
          const { email, password } = res;
          if (email === this.email && password === this.password) {
            this.toaster.success('login successfully.');
            sessionStorage.setItem('admin', JSON.stringify(res));
            this.router.navigateByUrl('/dashboard');
            this.email = '';
            this.password = '';
          } else {
            this.toaster.error('Invalid Credentials.');
          }
        },
        error: (reson: any) => this.toaster.error(reson.message),
      });
    } else {
      this.toaster.warning('Please fill the form completely');
    }
  }
}
