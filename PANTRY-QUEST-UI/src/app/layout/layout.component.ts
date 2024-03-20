import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  userLoggedIn = true;
  navShow: boolean = false;

  constructor(private router: Router) {   
    this.router.events.pipe(filter((event:any) => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.navShow = event.urlAfterRedirects.includes("/login") || event.urlAfterRedirects.includes("/signup") ? false: true;
    });
  }

  ngOnInit(): void {
  }
}
