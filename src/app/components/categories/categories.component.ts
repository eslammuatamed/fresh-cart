import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private _EcomdataService: EcomdataService) {}
  categoriesSubscribe!: Subscription;
  categories: any[] = [];
  subCategories: any[] = [];
  subCategoryName: string = '';
  ngOnInit() {
    this.categoriesSubscribe = this._EcomdataService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.data;
      },
    });
  }

  getSubCate(id: string, name: string): void {
    this.subCategoryName = name;
    this._EcomdataService.getSubCategories(id).subscribe({
      next: (data) => {
        this.subCategories = data.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy() {
    this.categoriesSubscribe.unsubscribe();
  }
}
