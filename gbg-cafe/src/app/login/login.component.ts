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
        let body = JSON.stringify({ name, password });
        this.http.post(Urls.login, body, { headers: GCHeader.headers })
        .subscribe(
            response => {
                
                console.log("authorization: "+response.headers.get('Authorization'));
                console.log(response.headers);

                var user = response.json();
                console.log(user);

                localStorage.setItem("id_token", response.headers.get("Authorization"));
                localStorage.setItem("shop_id", user.shops[0].id);

                console.log("user type : " + user.user_type);
                if(user.user_type=="CUSTOMER"){
                    
                    this.router.navigate(['shop']);
                }else if(user.user_type=="ADMIN"){
                    this.router.navigate(['shop']);
                }else{
                    console.log("crap!");
                }
                
            },
            error => {
            alert(error.text());
            console.log(error.text());
        }
      );
      return false;
    }

}