import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { globalUrl } from '../globalUrl';



@Component({
  selector: 'app-siderbar-menu',
  templateUrl: './siderbar-menu.component.html',
  styleUrls: ['./siderbar-menu.component.css']
})
export class SiderbarMenuComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  componentToShow:string='';
  // showSubSubMenu: boolean = false;
  constructor(private userService: UserService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  
    this.route.queryParams.subscribe(params =>{
      this.componentToShow = params.component;
    })
    this.userService.checkToken(globalUrl.checkTokenUrl).subscribe((response:any)=>{
      console.log("responseeeeeeeeeeeeeeee",response);
      
      // this.router.navigate(['/siderbar-menu']);
    },(error:any)=>{
      console.log(error);
    })
    // this.fetchDashboardDetails();
  }

  toggleSidebar() {
    this.sidenav.toggle();
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  logout() {
    // Clear localStorage
    localStorage.clear();
  }
  dashboardDetails: any;
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
