import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfilComponent } from './profil/profil.component';
import { ResultComponent } from './result/result.component';
import { ConfigComponent } from './config/config.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'settings', component: ConfigComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
