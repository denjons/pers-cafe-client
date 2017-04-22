
export class Urls {
    static base = "http://localhost:8080/cafe-app/webapi";
    //static base = "http://localhost:8081/cafe-app/webapi";
   // static base = "http://158.234.155.43:8080/cafe-app/webapi";
    static login = Urls.base + "/user/login";
    static getShop = Urls.base + "/shop/get";
    static purchase = Urls.base + "/shop/purchase";
    static updateProduct = Urls.base + "/product/update";
    static removeProduct = Urls.base + "/product/remove";
    
}