import { Component, OnInit } from '@angular/core';
import { Compania } from './compania';
import { CompaniaService } from './compania.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-compania-form',
  templateUrl: './compania-form.component.html'
})
export class CompaniaFormComponent implements OnInit {
  public titulo:string;
  public compania:Compania = new Compania();
  constructor(private companiaService: CompaniaService,private router:Router, private alertService: AlertService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCompania();
  }

  create():void{
    console.log(this.compania);
    this.companiaService.create(this.compania).subscribe(
      compania => this.alertService.success(`Se ha introducido correctamente el juego `, {autoClose: true, keepAfterRouteChange: true})
    )
    this.router.navigate(['/companias']);
  }
  update():void{
    console.log(this.compania);
    this.companiaService.updateCompania(this.compania).subscribe(
      compania => this.alertService.success(`Se ha actualizado correctamente el juego `, {autoClose: true, keepAfterRouteChange: true})
    )
    this.router.navigate(['/companias']);
  }

  loadCompania():void{
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id) {
          this.titulo = 'Editar compañía';
          this.companiaService.getCompania(id).subscribe( //Método de juego service por crear
            compania => this.compania = compania
          )
        }else{
          this.titulo = 'Crear compañía';
        }
      }
    )
  }

}
