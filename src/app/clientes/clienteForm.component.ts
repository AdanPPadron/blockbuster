import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './clienteForm.component.html'
})
export class FormComponent implements OnInit {
  public cliente:Cliente = new Cliente();
  titulo:string = "Crear Cliente";
  constructor(private ClienteService: ClienteService,
    private router:Router) { }

  ngOnInit(): void {
  }

  public create():void{
    this.ClienteService.create(this.cliente).subscribe(
      response => this.router.navigate(['/clientes'])
    )
  }
}
