import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.credentials={username:'',password:''}
  }

  login():void{
    console.log(this.credentials);
    this.router.navigate(['/companies']);
  }

}
