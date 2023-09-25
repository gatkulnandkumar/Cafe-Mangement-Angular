import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { globalUrl } from '../globalUrl';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  passwordVisible: boolean = false;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  signup() {
    if (this.signupForm.valid) {
      return;
    }

    const name = this.signupForm.value.name;
    const contactNumber = this.signupForm.value.contactNumber;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    // const confirmPassword = this.signupForm.value.confirmPassword;

    // if (password !== confirmPassword) {
    //   this.toastr.error('Password does not match.', '', {
    //     timeOut: 2000,
    //   });
    //   return;
    // }

    var payload = {
      "name": this.signupForm.value.name,
      "contactNumber": this.signupForm.value.contactNumber,
       "email" : this.signupForm.value.email,
        "password" : this.signupForm.value.password

    }

    this.userService.signup(globalUrl.signupUrl,payload).subscribe(
      (response: any) => {
        // Handle successful signup response
        this.toastr.success('User registered successfully', '', {
          timeOut: 2000,
        });
        // Do any additional actions after successful registration
        this.router.navigate(['/login']);
      },
      (error: any) => {
        // Handle signup error
        console.error("Error in signup:", error);
        this.toastr.error('An error occurred during signup. Please try again later.', '', {
          timeOut: 2000,
        });
      }
    );
  }

  cancel() {
    this.signupForm.reset();
  }

 

}
