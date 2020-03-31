import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError} from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndoPoint:string = 'http://localhost:8090/clientes';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  
  constructor(private http: HttpClient, private alertService: AlertService) { }

  getClientes():Observable<Cliente[]>{
    return this.http.get(this.urlEndoPoint).pipe(
      map( response => response as Cliente[]),catchError(error => {
        console.error(`ClienteService::getClientes error: "${error.message}"`);
        this.alertService.error(`Error al consultar los clientes: "${error.message}"`, {autoClose: true, keepAfterRouteChange: false});
        return throwError(error);
      })
    )
  }

  
  create(cliente: Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndoPoint, cliente, {headers: this.httpHeaders});
  }
}
