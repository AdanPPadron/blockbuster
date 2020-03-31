import { Component, OnInit } from '@angular/core';
import { Compania } from './compania';
import { CompaniaService } from './compania.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-compania',
  templateUrl: './compania.component.html'
})
export class CompaniaComponent implements OnInit {

  companias: Compania[];
  constructor(private companiaService: CompaniaService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.refreshCompanias();
  }

  delete(id: number): void {
    if (confirm(`Si borra esta compañía todos los juegos asociados serán borrados.
                ¿Está seguro que desea eliminar la compañía con id: ${id}?`)) {
      this.companiaService.deleteCompania(id).subscribe(response => { 
        this.alertService.success(`Se ha eliminado correctamente la compañía con ID: ${id}`, {autoClose: true});
        this.refreshCompanias();
      });
    }
  }

  refreshCompanias():void{
    this.companiaService.getCompanias().subscribe(
      companias => this.companias = companias
    );
  }

}
