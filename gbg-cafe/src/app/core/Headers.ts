import { Headers } from '@angular/http';



export class GCHeader{

     static headers = new Headers();
     static AUTHORIZATION = "authorization";

}

GCHeader.headers.append('Accept', 'application/json');
GCHeader.headers.append('Content-Type', 'application/json');

/*
GCHeader.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
GCHeader.headers.append("Access-Control-Allow-Origin", "*");
GCHeader.headers.append("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
GCHeader.headers.append("Access-Control-Allow-Credentials", "true");
GCHeader.headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
GCHeader.headers.append("Access-Control-Max-Age", "1209600");
*/