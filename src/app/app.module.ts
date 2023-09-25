import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './home/header/header.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { FooterComponent } from './home/footer/footer.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LoginComponent } from './login/login.component';
import { CafeDashboradComponent } from './cafe-dashborad/cafe-dashborad.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import this for mat-form-field
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SiderbarMenuComponent } from './siderbar-menu/siderbar-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ProductComponent } from './dialog/product/product.component';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { ResetPasswordComponent } from './dialog/reset-password/reset-password.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    LoginComponent,
    CafeDashboradComponent,
    SignupComponent,
    ForgotPasswordComponent,
    SiderbarMenuComponent,
    DashboardMainComponent,
    ManageCategoryComponent,
    AddCategoryDialogComponent,
    ManageProductComponent,
    ConfirmationComponent,
    ProductComponent,
    ViewBillProductsComponent,
    ManageOrderComponent,
    ViewBillComponent,
    ManageUserComponent,
    AboutUsComponent,
    ContactUsComponent,
    ResetPasswordComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule ,
    
    
  ],
  providers: [HttpClientModule,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
