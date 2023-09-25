import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit  {


  responseMessage: any;
  email: string ='';

  resetPasswordForm: FormGroup = new FormGroup({}); // Initialize with an empty form group


  passwordVisible: boolean = false;
  


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService,
    public dialogRef:MatDialogRef<ResetPasswordComponent>,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.email = params.email;
    //   this.resetPasswordForm = this.formBuilder.group({
    //     // email: [{ value: this.email, disabled: true }],
    //     email: [this.email, [Validators.required]],
    //     otp: [null, [Validators.required]],
    //     newPassword: [null, [Validators.required]]
    //   });
    // });
    this.resetPasswordForm = this.formBuilder.group({
      email: [''],
      otp: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    }, { validator: this.matchPasswordsValidator });

  }

 // Function to toggle password visibility
//  togglePasswordVisibility(field: string): void {
//   this.passwordVisibility[field] = !this.passwordVisibility[field];
// }
  
togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}

// Custom validator function
matchPasswordsValidator(group: FormGroup) {
  const newPassword = group.get('newPassword')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  if (newPassword === confirmPassword) {
    return null; // Passwords match
  } else {
    return { passwordMismatch: true }; // Passwords do not match
  }
}

  resetPassword() {
    const formData = this.resetPasswordForm.value;
    const data = {
      email: formData.email,
      otp: formData.otp,
      newPassword: formData.newPassword
    };
    this.userService.resetPassword(data).subscribe(
      (response: any) => {
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage, '');
        this.router.navigate(['/login']);

        setTimeout(() => {
          this.responseMessage = 'Password reset successful!';
          this.snackbarService.openSnackBar(this.responseMessage, '');
          // Close the dialog after successful password reset
          this.dialogRef.close();
        }, 1000);   
      },
      
      (error:any) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
    
  }

}
