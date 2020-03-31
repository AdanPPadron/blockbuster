import { Component, OnInit } from '@angular/core';
import { Juego } from './juego';
import { JuegoService } from './juego.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  juegos: Juego[];

  constructor(private juegoService: JuegoService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.refreshJuegos();
  }

  delete(id: number): void {
    if (confirm(`¿Está seguro que desea eliminar el juego ${id}?`)) {
      this.juegoService.deleteJuego(id).subscribe(response => { 
        this.alertService.success(`Se ha eliminado correctamente el juego con ID: ${id}`, {autoClose: true});
        this.refreshJuegos();
      });
    }
  }

  refreshJuegos():void{
    this.juegoService.getJuegos().subscribe(
      juegos => this.juegos = juegos
    );
  }

}
