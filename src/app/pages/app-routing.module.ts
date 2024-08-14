import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticateGuard } from "../guards/authentication.guards";
import { environment } from "../../environments/environment";

export const unAuthenticatedRoute = {
  canActivate: [AuthenticateGuard],
  data: {
    routeToRedirect: environment.config.redirectToWhenAuthenticated,
    unprotectedRoute: true,
  },
};

export const authenticatedRoute = {
  canActivate: [AuthenticateGuard],
  data: {
    routeToRedirect: environment.config.redirectToWhenUnauthenticated,
    protectedRoute: true,
  },
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    ...unAuthenticatedRoute
  },
  {
    path: 'feed',
    loadChildren: () => import('./main/feed/feed.module').then(m => m.FeedPageModule),
    ...authenticatedRoute
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
    ...unAuthenticatedRoute
  },
  {
    path: 'logout',
    loadChildren: () => import('./main/logout/logout.module').then(m => m.LogoutPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./main/profile/profile.module').then(m => m.ProfilePageModule),
    ...authenticatedRoute,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
