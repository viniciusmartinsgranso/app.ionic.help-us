import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'feed',
    loadChildren: () => import('./main/feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./main/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./main/profile/profile.module').then( m => m.ProfilePageModule)
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
export class AppRoutingModule { }
