import { Component, OnInit } from '@angular/core';
import { Juego } from './juego';
import { JuegoService } from './juego.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { Compania } from '../compania/compania';
import { CompaniaService } from '../compania/compania.service';
import { JuegoComponent } from './juego.component';
@Component({
  selector: 'app-form',
  templateUrl: './juegoForm.component.html'
})
export class FormComponent implements OnInit {

  public juego:Juego = new Juego();
  public cif: string;
  cardTitle:string;

  categorias:any[]= [{title: 'Plataformas', value:'Plataformas'}, {title: 'Deportes', value:'Deportes'}, 
  {title: 'Carreras', value:'Carreras'}, {title: 'Disparos', value:'Disparos'}, 
  {title: 'Simulación', value:'Simulacion'}, {title: 'Acción', value:'Accion'}, {title: 'Aventuras', value:'Aventuras'}];

  companias: Compania[] = [];
  constructor(private juegoService: JuegoService,
    private router:Router, private alertService: AlertService, private companiaService: CompaniaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadJuego();
    this.loadCompanias();
  }

  create():void{
    console.log(this.juego);
    console.log(this.cif);
    this.juegoService.create(this.juego, this.cif).subscribe(
      juego => this.alertService.success(`Se ha introducido correctamente el juego `, {autoClose: true, keepAfterRouteChange: true})
    )
    this.router.navigate(['/juegos']);
    
  }

  update():void{
    console.log(this.juego);
    console.log(this.cif);
    this.juegoService.updateJuego(this.juego, this.cif).subscribe(
      juego => this.alertService.success(`Se ha actualizado correctamente el juego `, {autoClose: true, keepAfterRouteChange: true})
    )
    this.router.navigate(['/juegos']);
  }

  loadJuego():void{
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id) {
          this.cardTitle = 'Editar juego';
          this.juegoService.getJuego(id).subscribe( //Método de juego service por crear
            juego => this.juego = juego
          )
        }else{
          this.cardTitle = 'Crear juego';
        }
      }
    )
  }
  loadCompanias():void{
    this.companiaService.getCompanias().subscribe(
      companias => this.companias = companias
    );
  }

}
