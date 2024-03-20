import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) {
  }

  ngOnInit(){

  }

  loginSubmit(checkLogin: boolean) {
    // check login
    if(checkLogin) {
      this.router.navigate(['/dashboard']);
    }
  }
}
