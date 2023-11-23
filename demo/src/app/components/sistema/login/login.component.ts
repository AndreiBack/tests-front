import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginService = inject(LoginService);
  login: Login = new Login();
  roteador = inject(Router);

  constructor() {
    //remover o token aqui
    this.loginService.removeToken();
  }

  logar() {
    //implementar a requisição aqui e colocar o token no localstorage
    this.loginService.logar(this.login).subscribe({
      next: usuario => {localStorage.setItem("token", usuario.token),this.roteador.navigate(['admin/produtos']);
    },
      error: erro => {console.log(erro);
      }
    });

   
  }
}
