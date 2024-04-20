import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  private readonly router: Router = inject(Router);

  constructor() {
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((route) => {
        const routerEvent = route as NavigationEnd;

        if (!this.routesWithoutNavbar.includes(routerEvent.url)) {
          if (!this.routesWithoutNavbar.includes(routerEvent.urlAfterRedirects))
            this.canShowNavbar = true;
        } else {
          this.canShowNavbar = false;
        }
      });
  }

  public canShowNavbar: boolean = false;

  public routesWithoutNavbar: string[] = ['/login', '/new-feed-occurrence', '/register', '/logout'];

  public routeSubscription: Subscription = new Subscription();

  public async ngOnDestroy(): Promise<void> {
    this.routeSubscription.unsubscribe();
  }

  // public async verifyUser(): Promise<void> {
  //   const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  //
  //   if (!loggedUser) {
  //     return void await this.router.navigateByUrl('/login');
  //   }
  // }
}
