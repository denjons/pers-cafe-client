import { Headers } from '@angular/http';



export class GCHeader{

     static headers = new Headers();
     static ATYHORIZATION = "authorization";
     static temp_jwt = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0IiwiaWF0IjoxNDg5MjIzNzkyLCJzdWIiOiIvdXNlci9jcmVhdGV1c2VyIiwiaXNzIjoiVE1fV0lMREZMWV83In0.wW9YYV3WexzD7vFcaDBZLZlqt5KrcuyEfvgHi0KB4jA";
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