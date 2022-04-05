import { Injectable } from "@angular/core";
import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate{

    constructor(private loginService: LoginService){}

    checkAuthentication(path: string): boolean{
        const loggedIn = this.loginService.isLoggedIn()
        
        if(!loggedIn){ this.loginService.handleLogin(`/${path}`) }
        return loggedIn
    }

    // canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> { //Autocomplete padrão
    canLoad(route: Route): boolean { return this.checkAuthentication(route.path) }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): boolean{
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }
}