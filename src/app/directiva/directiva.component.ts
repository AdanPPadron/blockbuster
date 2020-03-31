import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent{

  listaCurso: string[] = ['Oracle SQL', 'Oracle PL/SQL', 'Spring Boot 4', 'Angular', 'TypeScript']
  habilitar: boolean = true;
  constructor() { }

  setHabilitar(): void{
    this.habilitar = (this.habilitar == true)?false: true
  }
}

