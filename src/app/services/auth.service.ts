import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  private emailSubject = new BehaviorSubject<string | null>(null);
  email$ = this.emailSubject.asObservable();

  sendEmail(email: string) {
    this.emailSubject.next(email);
  }

  public isAuthenticated():boolean{
    const token = localStorage.getItem('token');

    if(!token){
      this.router.navigate(['/']);
      return false;
    }
    else{
      return true;
    }
  }
}
