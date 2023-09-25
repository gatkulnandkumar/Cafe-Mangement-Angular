import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { globalUrl } from '../globalUrl';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit(): void {
    this.fetchDashboardDetails();
  }

  dashboardDetails: any={};
  // dashboardDetails: any[] = [];

  fetchDashboardDetails() {
    // Call the dashboardDetails method in UserService (without sending any data)
    this.userService.getdashboardDetails(globalUrl.dashboardUrl).subscribe(
      (data) => {
        console.log("data======",data);
        
        this.dashboardDetails = data;
        console.log('Dashboard details:', this.dashboardDetails);
      },
      (error) => {
        console.error('Failed to fetch dashboard details:', error);
      }
    );
  }

}
