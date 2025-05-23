import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-renta',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './renta.component.html',
  styleUrls: ['./renta.component.scss']
})
export class RentaComponent implements OnInit {
  items: any[] = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.getItems().subscribe(allItems => {
      this.items = allItems.filter(item =>
        item.categoria && item.categoria.trim().toUpperCase() === 'RENTA'
      );
    });
  }

}
