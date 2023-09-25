import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { globalUrl } from '../globalUrl';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  filterText: string = '';
  categories: any[] = [];

  @Output() filterChanged = new EventEmitter<string>();
  constructor(public dialog: MatDialog,private userService:UserService,private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef, private router:Router
    ) { }

  // ViewChild to get a reference to MatSort
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'action']; // Define columns for the table
  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.categories);

  pageSize = 5; // Set your desired page size
  pageIndex = 0;
  totalItems = 0;

  ngOnInit(): void {
    this.fetchData();
  }

  onPageChange(event: PageEvent) {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageIndex = event.pageIndex;
    this.dataSource.paginator.pageSize = event.pageSize;
  }

  fetchData(){
    this.userService.getCategory(globalUrl.categoryUrl).subscribe(
      (categories: any) => {
        this.categories = categories;
        // this.dataSource.data = categories;
        this.dataSource = new MatTableDataSource(this.categories) ;
        this.dataSource.paginator = this.paginator;
        this.changeDetectorRef.detectChanges(); 
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        // Do something with the category name (e.g., add it to your categories list)
        console.log('New category name:', result);
         // Add the new category to the categories array
         this.categories.push({ name: result });
         // Update the table data source
         this.dataSource.data = [...this.categories];
      }
    });
  }

    // Function to handle the action for each category
    // handleCategoryAction(category: any) {
    //   // Implement your action logic here
    //   console.log('Action for category:', category);

      
    // }
    handleCategoryAction(category: any) {
      // Toggle the editing mode for the selected category
      category.editing = !category.editing;
    
      if (!category.editing) {
        // Category editing is done, perform the API call
        const updatedData = {
          "id": category.id,
          "name": category.updatedName // Use the updatedName from the input field
        };
    
        this.userService.updateCategory(globalUrl.categoryUrl,updatedData).subscribe(
          (response: any) => {
            console.log('Category updated successfully:', response);
            // Update the local data with the updated information
            const index = this.categories.findIndex(cat => cat.id === category.id);
            if (index !== -1) {
              this.categories[index].name = response.name;
              // Update the table data source
              this.dataSource.data = [...this.categories];
              this.changeDetectorRef.detectChanges();
              // Show success toast notification
              this.toastr.success('Category updated successfully!', 'Success');
      
              // Delay the navigation and page reload to ensure the change detection is complete
          setTimeout(() => {
            this.router.navigate(['/siderbar-menu'], { queryParams: { component: 'manage-category' } });
            window.location.reload();
          }, 0);
        
            }
          },
          (error: any) => {
            console.error('Error updating category:', error);
            // Show error toast notification
            this.toastr.error('An error occurred while updating the category.', 'Error');
          }
        );
      }
    }
    
    toggleEdit(category: any) {
      category.editing = !category.editing;
    
      // Reset the updatedName if not in editing mode
      if (!category.editing) {
        category.updatedName = category.name;
      }
    }
    
}
