  import { Component, OnInit, Renderer2 } from '@angular/core';
  import { UserService } from '../services/user.service';
  import { FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';
  import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { globalUrl } from '../globalUrl';
import { utf8Encode } from '@angular/compiler/src/util';
import { AuthService } from '../services/auth.service';
import { ResetPasswordComponent } from '../dialog/reset-password/reset-password.component';

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
    passwordVisible: boolean = false;
    loginError: string = '';
   name: any;
   email:any;
   isForgotPasswordDialogOpen: boolean = false;
    constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router,
      private toastr: ToastrService,
      private dialog:MatDialog,
      private authService:AuthService
    ) { }
  
    ngOnInit(): void {
      this.authService.email$.subscribe(email => {
        if (email) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.width = "550px";
          dialogConfig.data = { email }; // Pass the email to ResetPasswordComponent
          this.dialog.open(ResetPasswordComponent, dialogConfig);
        }
      });
    }
  
    loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }
  
    login() {
      console.log("this.loginForm.value",this.loginForm.value.email);
      var payload = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password
        
      }
      // Add non-null assertions (!) to form control get calls
      this.userService
        .login(globalUrl.signIn,payload)
        .subscribe(
          (response: any) => {
            // Handle successful login response
            const token = response.token;
            localStorage.setItem('token', token);
            console.log('Token::::', token);
    
            this.toastr.success('Login Successfully', '', {
              timeOut: 2000,
            });
            this.router.navigate(['/siderbar-menu']);
          },
          (error: any) => {
            console.error('Error in login:', error);
            this.toastr.error('Invalid username and password', '', {
              timeOut: 2000,
            });
            this.router.navigate(['/login']);
          }
        );
    }
    handleForgotPasswsAction(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "550px";
      // this.dialog.open(ForgotPasswordComponent,dialogConfig);
        // Set the flag to true when the dialog is open
    this.isForgotPasswordDialogOpen = true;

    const dialogRef = this.dialog.open(ForgotPasswordComponent, dialogConfig);

    // Listen to dialog close event and set the flag back to false
    dialogRef.afterClosed().subscribe(() => {
      this.isForgotPasswordDialogOpen = false;
    });
     
    }
    
  
    loginCancel() {
      this.loginForm.reset();
    }
    // passwordVisible: boolean = false;
    // email: string = '';
    // password: string = '';
    // loginError: string = '';
  
    // constructor(private fb: FormBuilder,private userService:UserService, private router: Router, private toastr: ToastrService) { }
  
    // ngOnInit(): void {
    // }
  
    // loginForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: [null, [Validators.required]],
  
    // });
  
    // // loginForm =  new FormGroup({
    // //   user:new FormControl(''),
    // //   password: new FormControl('')
    // // })
    // togglePasswordVisibility() {
    //   this.passwordVisible = !this.passwordVisible;
    // }
  
    // login() {
    //   this.userService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
    //     (response: any) => {
    //       // Handle successful login response
    //       const token = response.token; // Assuming the token is returned as 'token' in the response
    //       localStorage.setItem('token', token); // Store the token in localStorage or your preferred storage mechanism
    //       console.log('Token::::', token);
          
    //       this.toastr.success('Login  Successfully', '', {
    //         timeOut: 2000,
    //       });
    //       this.router.navigate(['/dashboard']);
  
    //     },
    //     // (error: any) => {
    //     //   // Handle login error
    //     //   console.error(error);
    //     //   this.loginError = 'Invalid username or password.';
    //     // }
    //     (error: any) => {
    //       console.error("Error in login:", error);
    //       this.toastr.error('Invalid username and password', '', {
    //         timeOut: 2000,
    //       });
    //       this.router.navigate(['/login']);
    //     }
    //   );
    // }
  
    // loginCancel(){
    //   this.loginForm.reset();
    // }
  
  }