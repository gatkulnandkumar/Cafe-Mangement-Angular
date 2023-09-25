import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { saveAs } from 'file-saver';
import { globalUrl } from '../globalUrl';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {

  displayedColumns: string[] = ['name','category','price','quantity','total','edit'];
  dataSource:any =[];
  manageOrderForm:any = FormGroup;
  categorys:any = [];
  products:any = [];
  price:any;
  totalAmount:number =0;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.getCategory();
    this.manageOrderForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      paymentMethod:[null,[Validators.required]],
      product:[null,[Validators.required]],
      category:[null,[Validators.required]],
      quantity:[null,[Validators.required]],
      price:[null,[Validators.required]],
      total:[0,[Validators.required]]

    });
  }
  getCategory(){
     this.userService.getFilteredCategorys(globalUrl.categoryUrl).subscribe((response:any)=>{
      this.categorys = response;
     },(error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      } else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
     })
  }

  getProductsByCategory(value:any){
    this.userService.getProductsByCategory(globalUrl.productUrl,value.id).subscribe((response:any)=>{
      // ,
      this.products = response;
      this.manageOrderForm.controls['price'].setValue('');
      this.manageOrderForm.controls['quantity'].setValue('');
      this.manageOrderForm.controls['total'].setValue(0);
    },(error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      } else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getProductDetails(value:any){
    this.userService.getById(globalUrl.productUrl,value.id).subscribe((response:any)=>{
      this.price = response.price;
      this.manageOrderForm.controls['price'].setValue(response.price);
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(this.price*1);
    },(error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      } else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  setQuantity(value:any){
    var temp = this.manageOrderForm.controls['quantity'].value;

    if(temp>0){
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    }
    else if(temp != ''){
       this.manageOrderForm.controls['quantity'].setValue('1');
       this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    }
  }

  validateProductAdd(){
    if(this.manageOrderForm.controls['total'].value ===0 || this.manageOrderForm.controls['total'].value === null
    || this.manageOrderForm.controls['quantity'].value <= 0){
      return true;
    }
    else
      return false;
  }

  validateSubmit(){
    if(this.totalAmount ===0 || this.manageOrderForm.controls['name'].value === null || this.manageOrderForm.controls['email'].value === null 
    || this.manageOrderForm.controls['contactNumber'].value === null || this.manageOrderForm.controls['paymentMethod'].value === null)
    {
      return true;
    }
    else
    return false;
  }

  add(){
    var formData = this.manageOrderForm.value;
    var productName = this.dataSource.find((e:{id: number}) => e.id === formData.product.id);

    if(productName === undefined){
      this.totalAmount = this.totalAmount + formData.total;
      this.dataSource.push({id:formData.product.id,name:formData.product.name,category:formData.category.name,quantity:formData.quantity,price:formData.price,total:formData.total});
      this.dataSource = [...this.dataSource];
      this.snackbarService.openSnackBar(GlobalConstants.productAdded,"success");
    }
    else{
      this.snackbarService.openSnackBar(GlobalConstants.productExistError,GlobalConstants.error);
    }
  }

  handleDeleteAction(value:any,element:any){
    this.totalAmount  = this.totalAmount - element.total;
    this.dataSource.splice(value,1);
    this.dataSource = [...this.dataSource];
  }

  submitAction(){
    var formData = this.manageOrderForm.value;
    var data = {
      "name": formData.name,
      "email": formData.email,
      "contactNumber": formData.contactNumber,
      "paymentMethod": formData.paymentMethod,
      "totalAmount": this.totalAmount.toString(),
      "productDetails": JSON.stringify(this.dataSource)

    }

    this.userService.generateReport(globalUrl.billUrl,data).subscribe((response:any)=>{
      this.downloadFile(response?.uuid);
      this.manageOrderForm.reset();
      this.dataSource = [];
      this.totalAmount = 0;
      console.log("generateReport------",formData);
    },(error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      } else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  downloadFile(fileName:string){
       var data = {
          "uuid": fileName
       }
       this.userService.getPDF(globalUrl.billUrl,data).subscribe((response:any)=>{
        saveAs(response,fileName + '.pdf');
       })
  }
}
