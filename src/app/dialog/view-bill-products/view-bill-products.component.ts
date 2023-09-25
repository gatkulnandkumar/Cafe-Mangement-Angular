import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-bill-products',
  templateUrl: './view-bill-products.component.html',
  styleUrls: ['./view-bill-products.component.css']
})
export class ViewBillProductsComponent implements OnInit {

  displayedColumns : string[] = ['name','category','price','quantity','total'];
  dataSource:any;
  data:any;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  public dialog: MatDialogRef<ViewBillProductsComponent>) { }

  ngOnInit(): void {
    this.data = this.dialogData.data;
    this.dataSource = JSON.parse(this.dialogData.data.productDetail);
    console.log(this.dialogData.data);
  }





}
