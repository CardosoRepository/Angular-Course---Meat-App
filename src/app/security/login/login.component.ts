import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'app/shared/messages/notification.service';
import { LoginService } from './login.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  navigateTo: string

  constructor(private fb: FormBuilder, 
              private loginService: LoginService, 
              private notificationService: NotificationService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || '/' //Caso não seja chamada alguma rota, vai para a raíz
  }

  login(){
    this.loginService.login(this.loginForm.value.email, 
                            this.loginForm.value.password)
                     .subscribe(user => 
                                  this.notificationService.notify(`Bem-vindo(a), ${user.name}`),
                                response => //HttpErrorResponse
                                  this.notificationService.notify(response.error.message),
                                  () => {
                                    this.router.navigate([this.navigateTo])
                                  })
  }
}
