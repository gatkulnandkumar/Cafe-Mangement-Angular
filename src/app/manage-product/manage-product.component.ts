import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ProductComponent } from '../dialog/product/product.component';
import { globalUrl } from '../globalUrl';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<string>();

  displayedColumns: string[] = ['name', 'categoryName', 'description', 'price', 'edit'];
  dataSource:any;
  length1:any;
  responseMessage:any;

  constructor( private userService: UserService,private router:Router,
    private dialog:MatDialog,private snackbarService:SnackbarService) { }
  filterText: string = '';
  ngOnInit(): void {
    console.log("thiss isss manage product.............");
    // this.router.navigate(['/siderbar-menu'], { queryParams: { component: 'manage-product' } });
    this.tableData();
  }

  tableData(){
    console.log("tableeeee databaaaaa");
    
    this.userService.getProducts(globalUrl.productUrl).subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;  
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error)
    })
  }

 
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction
  (){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddProduct.subscribe((response)=>{
      this.tableData();
    })
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data:values
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditProduct.subscribe((response)=>{
      this.tableData();
    })
  }

  handleDeleteAction(values:any){
    console.log("insideeeee handelAcctionnnDelete===>");
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:'delete '+values.name+' product',
      confirmation:true
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.deleteProduct(values.id);
      dialogRef.close();
    })
  }

  deleteProduct(id:any){
    this.userService.deleteProduct(globalUrl.productUrl,id).subscribe((response:any)=>{
      this.tableData();
      this.responseMessage =response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;  
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error)
    })
  }
  onChange(status:any,id:any){
    var data = {
      "status": status.toString(),
      "id":id
    }
    this.userService.updateStatus(globalUrl.productUrl,data).subscribe((response:any)=>{
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;  
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error)
    })
  }
      
  toggleEdit(category: any) {
    category.editing = !category.editing;
  
    // Reset the updatedName if not in editing mode
    if (!category.editing) {
      category.updatedName = category.name;
    }
  }
  

}
