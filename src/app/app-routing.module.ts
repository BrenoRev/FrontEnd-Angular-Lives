import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  { path: 'lives', loadChildren: () => import('./views/lives/lives.module').then(m => m.LivesModule) },
  {
    path: '',
    redirectTo: '/lives',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }