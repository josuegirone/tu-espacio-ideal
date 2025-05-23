import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-estadia',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './estadia.component.html',
  styleUrls: ['./estadia.component.scss']
})
export class EstadiaComponent implements OnInit {
  items: any[] = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.getItems().subscribe(allItems => {
      this.items = allItems.filter(item =>
        item.categoria && item.categoria.trim().toUpperCase() === 'ESTADIA'
      );
    });
  }
}
