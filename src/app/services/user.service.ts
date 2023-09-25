import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginUrl = 'http://localhost:8182/user/login';
  private signupUrl = 'http://localhost:8182/user/signup';
  private forgotPasswdUrl = 'http://localhost:8182/user';
  private checkTokenUrl = 'http://localhost:8182/user';
  private dashboardDetailsUrl = 'http://localhost:8182/dashboard';

  // private addCategoryUrl = 'http://localhost:8182/category';
  // private getCategoryUrl = 'http://localhost:8182/category';
  // private updateCategoryUrl = 'http://localhost:8182/category';

  private getFilterCategoryUrl = 'http://localhost:8182/category';
  private addProductUrl = 'http://localhost:8182/product';
  
  private updateProductUrl = 'http://localhost:8182/product';
  private getProductUrl = 'http://localhost:8182/product';
  private updateStatusUrl = 'http://localhost:8182/product';
  private delProductUrl = 'http://localhost:8182/product';
  private getProductByCategoryUrl = 'http://localhost:8182/product';
  private getProdByIdUrl = 'http://localhost:8182/product';
  private generateBillReportUrl = 'http://localhost:8182/bill';
  private getPdfUrl ='http://localhost:8182/bill';
  private getBillsUrl ='http://localhost:8182/bill';
  private deleteBillUrl = 'http://localhost:8182/bill';
  private getUserUrl = 'http://localhost:8182/user';
  private updateUserURl = 'http://localhost:8182/user';


  private resetPasswordURl = 'http://localhost:8182/user';


  constructor(private http:HttpClient) { }

  login(url:string,formdata: any){
    // console.log("login  ========",email,password);
    // const body = {email,password};
    return this.http.post(url,formdata);
  }

  signup(url: string,formdata: any) {
    // console.log('Signup function called with data:', name, contactNumber, email, password);
    // const body = { name, contactNumber, email, password };
    return this.http.post(url, formdata);
  }

   forgotPassword(data:any){
    console.log("insideee servivceeee");
    
    return this.http.post(this.forgotPasswdUrl+"/forgotPassword",data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
   }

   getdashboardDetails(url: string){
    return this.http.get(url,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
   }

  //  youtube
  //  login(data:any){
  //   return this.http.post(this.forgotPasswdUrl+"/forgotPassword",data,{
  //     headers:new HttpHeaders().set('Content-Type','application/json')
  //   })
  //  }

  checkToken(url:string){
    return this.http.get(url);
   }

   addCategory(url:string,formdata: any): Observable<any> {
    // const payload = { name };
    return this.http.post(url + "/add", formdata,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getCategory(url:string){
    return this.http.get(url +"/get",{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
   }

   updateCategory(url:string,updatedData: any){
    return this.http.post(url+"/update",updatedData,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
   }

   addProduct(url:string,data:any){
    return this.http.post(url+"/add",data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
   }
   
   updateProduct(url:string,data:any){
    return this.http.post(url+"/update",data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
   }

   getProducts(url:string){
    return this.http.get(url+"/get")
   }

   updateStatus(url:string,data:any){
     return this.http.post(url+"/updateStatus",data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
     })
   }  

   deleteProduct(url:string,id:any){
    return this.http.post(url+"/delete/"+id,{
     headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  getProductsByCategory(url:string,id:any){
     return this.http.get(url +"/getByCategory/"+id);
  }

  getById(url:string,id:any){
     return this.http.get(url +"/getById/"+id);
  }

  generateReport(url:string,data:any){
    return this.http.post(url +"/generateReport",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getPDF(url:string,data:any):Observable<Blob>{
    return this.http.post(url +"/getPdf",data,{
      responseType: 'blob'
    });
  }

  getBills(url:string){
    return this.http.get(url+"/getBills");
  }

  deleteBill(url:string,id:any){
    return this.http.post(url+"/delete/"+id,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getUsers(url:string){
    return this.http.get(url+"/get");
  }

  updateUser(url:string,data:any){
    return this.http.post(url+"/update",data,{
       headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getFilteredCategorys(url:string){
    return this.http.get(url +"/get?filterValue=true");
  }

  resetPassword(data:any){
    return this.http.post(this.resetPasswordURl+"/reset-password",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }
 
}
