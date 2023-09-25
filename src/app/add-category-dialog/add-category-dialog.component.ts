import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { globalUrl } from '../globalUrl';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css']
})
export class AddCategoryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
  
  categoryName: string = '';
  

  
  
  onAddClick(): void {
    // Regular expression to match only alphabetic characters (strings)
    const alphabeticRegex = /^[A-Za-z]+$/;
    console.log("catttt",this.categoryName);
    
    var payload = {
      "name": this.categoryName, 
    }
    if (this.categoryName && alphabeticRegex.test(this.categoryName)) {
      console.log("globalUrl.categoryUrl",payload);
      
      this.userService.addCategory(globalUrl.categoryUrl,payload).subscribe(
        (response) => {
          // Handle success
          this.toastr.success(response.message, 'Success', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
            closeButton: true
          });
          this.dialogRef.close();
        },
        (error) => {
          // Handle error
          console.error(error);
        }
      );
      window.location.reload();
      
    } else {
      this.toastr.error('Invalid category name. Please provide a valid alphabetic string.', 'Error', {
        timeOut: 3000,
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
