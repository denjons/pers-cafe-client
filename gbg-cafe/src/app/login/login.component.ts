import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component,  OnInit } from '@angular/core';
import { GCHeader } from '../core/Headers';
import { Urls } from '../core/urls';

@Component({
    selector:"login",
    templateUrl:"./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    constructor(private router: Router, private http: Http){

    }

    ngOnInit(){

    }

    login(event, name, password){
       // event.preventDefault();

        console.log("logging in: show spinner or something");
        let body = JSON.stringify({ name, password });

        this.http.post(Urls.login, body, { headers: GCHeader.headers })
        .subscribe(
            response => {
                
                console.log("authorization: "+response.headers.get('Authorization'));
                console.log(response.headers);

                var token = response.headers.get("Authorization");

                if(token != null){
                    localStorage.setItem("id_token", token);
                    this.router.navigate(['shop']);
                }else{
                    console.log("token was null: show error message");
                }

                
                
            },
            error => {
             console.log("error while logging in: show error message");   
            alert(error.text());
            console.log(error.text());
        }
      );
      return false;
    }

}