import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const admin = inject(AdminService);
  const toast = inject(ToastrService);
  const router = inject(Router);

  if (admin.isLogedIn()) {
    return true;
  } else {
    toast.warning('Please Login..');
    router.navigateByUrl('');
    return false;
  }
};
