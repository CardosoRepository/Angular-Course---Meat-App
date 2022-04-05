import { Injectable } from "@angular/core";
import { CanLoad, Route } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad{

    constructor(private loginService: LoginService){}

    // canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> { //Autocomplete padrão
    canLoad(route: Route): boolean {
        const loggedIn = this.loginService.isLoggedIn()
        
        if(!loggedIn){ this.loginService.handleLogin(`/${route.path}`) }
        return loggedIn
    }
}