import { Injectable } from '@angular/core';
import { Compania } from './compania';
import { Observable, throwError} from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {

  private urlEndoPoint:string = 'http://localhost:8090/companias';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient, private alertService: AlertService, private router:Router, private loginService: LoginService) { }

  getCompanias(): Observable<Compania[]>{
    //return of(JUEGOS);
    return this.http.get(this.urlEndoPoint, {headers: this.loginService.getAuthHeaders()} ).pipe(
      map( response => response as Compania[] ),catchError(error => {
        console.error(`CompaniaService::getCompanias error: "${error.message}"`);
        if(error.status = 401){
          this.router.navigate(['/login']);
        }else{
          this.alertService.error(`Error al consultar las compañías: "${error.message}"`, {autoClose: true, keepAfterRouteChange: false});
        }
        return throwError(error);
      })
    );
    //return this.http.get<Juego[]>(this.urlEndoPoint);
  }

  create(compania: Compania) : Observable<Compania>{
    return this.http.post<Compania>(this.urlEndoPoint, compania, {headers: this.httpHeaders}).pipe(
      map( response => response as Compania ),catchError(error => {
        console.error(`CompaniaService::create error: "${error.message}"`);
        this.alertService.error(`Error al crear la compañía: "${error.message}"`, {autoClose: true, keepAfterRouteChange: false});
        return throwError(error);
      })
    );
  }

  updateCompania(compania: Compania): Observable<Compania>{
    return this.http.put<Compania>(`${this.urlEndoPoint}/${compania.id}`, compania,{headers: this.httpHeaders}).pipe(
      catchError(error => {
        console.error(`updateJuego error: "${error.message}"`);
        if(error.status == 400){
          error.error.errorMesage.replace('[', '').replace(']', '').split(',');
          this.alertService.error(error.error.errorMessage);
        }else{
          this.alertService.error(`Error al actualizar la compañía: "${error.message}"`);
        }
        return throwError(error);
      })
    );
  }

  getCompania(id:number): Observable<Compania>{
    return this.http.get<Compania>(`${this.urlEndoPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(error => {
        console.error(`getCompania error: "${error.message}"`);
          this.alertService.error(`Error al obtener la compañía (${id}): "${error.message}"`);
        return throwError(error);
      })
    );
  }

  deleteCompania(id:number) : Observable<any>{
    return this.http.delete<Compania>(`${this.urlEndoPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      map( response => response as Compania ),catchError(error => {
      console.error(`CompaniaService::deleteCompania error: "${error.message}"`);
      this.alertService.error(`Error al borrar la compañía con ID ${id}: "${error.message}"`, {autoClose: true, keepAfterRouteChange: false});
       return throwError(error);
    })
    );
  }

}
