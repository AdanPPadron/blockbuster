import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private ClienteService: ClienteService) { }

  ngOnInit(): void {
    this.ClienteService.getClientes().subscribe(
      
      clientes => this.clientes = clientes

      //Utilizamos () cuando hay más de un argumento
      //Utilizamos {} cuando es más de una línea de código
      //(clientes) => {this.clientes = clientes}

      //Forma alternativa
      //  function (clientes){
      //    this.clientes = clientes
      //  }
    );
  }

}
