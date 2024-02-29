import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css'],
})
export class UpdateAdminComponent implements OnInit {
  adminDetails: any = {};
  editAdminStatus: boolean = false;
  profilePicture: string =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  @Output() updateAdminEvent = new EventEmitter();

  constructor(
    private adminApi: AdminService,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getAdmin();
  }
  getAdmin() {
    this.adminApi.getAdminDetails().subscribe((res: any) => {
      this.adminDetails = res;
      if (res.profilePicture) {
        this.profilePicture = res.profilePicture;
      }
    });
  }

  editAdminButton() {
    this.editAdminStatus = true;
  }

  onCancel() {
    this.getAdmin();
    this.editAdminStatus = false;
  }

  getFile(event: any) {
    const file = event.target.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = (event: any) => {
      console.log(event.target.result);
      this.profilePicture = event.target.result;
      this.adminDetails.profilePicture = event.target.result;
    };
  }

  onUpdate() {
    this.adminApi.updateAdmin(this.adminDetails).subscribe({
      next: (res: any) => {
        this.toast.success('Updation Success');
        sessionStorage.setItem('admin', JSON.stringify(res));
        this.updateAdminEvent.emit(res.name);
        this.editAdminStatus = false;
      },
      error: (err: any) => this.toast.error(err?.message),
    });
  }
}
