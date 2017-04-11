import { Injectable } from '@angular/core';

@Injectable()
export class ImgService {
    imgCache: any;

    constructor() {
        this.imgCache = new Object();
        this.imgCache["drink"] = "/src/icons/smaller/soda.png";
        this.imgCache["snacks"] = "/src/icons/smaller/snack.png";
        this.imgCache["food"] = "/src/icons/smaller/burger.png";
        this.imgCache["other"] = "/src/icons/smaller/misc.png";
        this.imgCache["all"] = "/src/icons/smaller/allt.png";
    }

    getImg(id: string){
        return this.imgCache[id];
    }

}