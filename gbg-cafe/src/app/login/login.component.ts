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

    loading: boolean;
    loginFailed: boolean;
    errorMessage: string;

    constructor(private router: Router, private http: Http){
        this.loginFailed = false;
    }

    ngOnInit(){

    }

    login(event, name, password){

        // show spinner
        this.loading = true;

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
                    this.loginFailed = true;
                    this.errorMessage = "wrong username or password";
                }
                
            },
            error => {
                if(error.status==401){
                    this.loginFailed = true;
                    this.errorMessage = "wrong username or password";
                }else{
                    this.loading = false;
                    this.loginFailed = true;
                    this.errorMessage = "An error occured. "+error.text(); 
                }
              
        }
      );
      return false;
    }

}