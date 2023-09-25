import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../shared/global-constants';
import { globalUrl } from '../globalUrl';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  displayedColumns:string[] = ['name','email','contactNumber','status'];
  dataSource:any;
  responseMessage:any;
  constructor(private userService:UserService,private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
    this.userService.getUsers(globalUrl.usersUrl).subscribe((reponse:any)=>{
      this.dataSource = new MatTableDataSource(reponse);
    },(error:any)=>{
       console.log(error);
       if(error.error?.message){
         this.responseMessage = error.error?.message;
       }
       else{
        this.responseMessage = GlobalConstants.genericError;
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChange(status:any,id:any){
    var data = {
      status: status.toString(),
      id:id
    }
    
    this.userService.updateUser(globalUrl.usersUrl,data).subscribe((response:any)=>{
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
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
}
