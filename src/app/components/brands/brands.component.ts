import { Component } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/wish-list-data';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent {
  constructor(private _EcomdataService: EcomdataService) {}

  brands: any[] = [];
  specificBrand: Brand = {} as Brand;
  ngOnInit(): void {
    this._EcomdataService.getBrands().subscribe({
      next: (data) => {
        this.brands = data.data;
        console.log(this.brands);
      },
    });
  }
  selectBrand(id: string) {
    this._EcomdataService.getBrand(id).subscribe({
      next: (data) => {
        this.specificBrand = data.data;
      },
    });
  }
}
