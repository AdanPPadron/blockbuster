import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Juego } from './juego';
//import { JUEGOS } from './juego.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { JuegoComponent } from './juego.component';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private urlEndoPoint:string = 'http://localhost:8090/juegos';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient, private alertService: AlertService) { }

  getJuegos(): Observable<Juego[]>{
    //return of(JUEGOS);
    return this.http.get(this.urlEndoPoint).pipe(
      map( response => response as Juego[] ),catchError(error => {
        console.error(`JuegoService::getJuegos error: "${error.message}"`);
        this.alertService.error(`Error al consultar los juegos: "${error.message}"`, {autoClose: true, keepAfterRouteChange: false});
        return throwError(error);
      })
    );
    //return this.http.get<Juego[]>(this.urlEndoPoint);
  }

  create(juego: Juego, cif:string) : Observable<Juego>{
    return this.http.post<Juego>(this.urlEndoPoint, juego, {headers: this.httpHeaders.append("cif", cif)}).pipe(
      map( response => response as Juego ),catchError(error => {
        console.error(`JuegoService::create error: "${error.message}"`);
        this.alertService.error(`Error al crear el juego: "${error.message}"`, {autoClose: true, keepAfterRouteChange: false});
        return throwError(error);
      })
    );
  }

  getJuego(id:number): Observable<Juego>{
    return this.http.get<Juego>(`${this.urlEndoPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(error => {
        console.error(`getJuego error: "${error.message}"`);
        this.alertService.error(`Error al obtener el juego(${id}): "${error.message}"`);
        return throwError(error);
      })
    );
  }

  updateJuego(juego: Juego, cif:string): Observable<Juego>{
    return this.http.put<Juego>(`${this.urlEndoPoint}/${juego.idJuego}`, juego,{headers: this.httpHeaders.append("cif", cif)}).pipe(
      catchError(error => {
        console.error(`updateJuego error: "${error.message}"`);
        if(error.status == 400){
          error.error.errorMesage.replace('[', '').replace(']', '').split(',');
          this.alertService.error(error.error.errorMessage);
        }else{
          this.alertService.error(`Error al actualizar el juego: "${error.message}"`);
        }
        return throwError(error);
      })
    );
  }

  deleteJuego(id:number) : Observable<any>{
    return this.http.delete<Juego>(`${this.urlEndoPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      map( response => response as Juego ),catchError(error => {
      console.error(`JuegoService::deleteJuego error: "${error.message}"`);
      this.alertService.error(`Error al borrar el juego: "${error.message}"`, {autoClose: true, keepAfterRouteChange: false});
       return throwError(error);
    })
    );
  }
}
