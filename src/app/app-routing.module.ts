import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './home/header/header.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { FooterComponent } from './home/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { CafeDashboradComponent } from './cafe-dashborad/cafe-dashborad.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SiderbarMenuComponent } from './siderbar-menu/siderbar-menu.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { ResetPasswordComponent } from './dialog/reset-password/reset-password.component';


const routes: Routes = [
  {path:'', redirectTo:'cafedashboard' , pathMatch: 'full'},
  {path:'cafedashboard', component: CafeDashboradComponent},
  { path: 'header', component: HeaderComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'footer', component: FooterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },

  {
    path: 'manage-cat', component: ManageCategoryComponent
  },

  {
    path: 'manage-prod', component: ManageProductComponent
  },
  
  {
    path: 'reset-password', component: ResetPasswordComponent
  },

{
  path: 'siderbar-menu',
  component: SiderbarMenuComponent,
  children: [
  {
  path: 'dashboard-main',
  component: DashboardMainComponent
  },
  {
  path: 'manage-category',
  component: ManageCategoryComponent
  },
  {
    path: 'manage-product',
    component: ManageProductComponent
    },
    {
      path: 'manage-order',
      component: ManageOrderComponent
      },
      {
        path: 'view-bill',
        component: ManageOrderComponent
      },
      {
        path: 'manage-users',
        component: ManageUserComponent
      }

      
  ]
  },

  { path: 'forgotPassword', component: ForgotPasswordComponent },
  // { path: 'dashboard-main', component: DashboardMainComponent }
  // { path: 'next-page', component: NextPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
