import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  // private dashboardDetailsUrl = 'http://localhost:8181/dashboard';

  constructor(private httpClient:HttpClient) 
  {}
   
  // getDetails(){
  //   return this.httpClient.get(this.dashboardDetailsUrl+"/details");
  // }
}
