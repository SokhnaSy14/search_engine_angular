import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './profil.component';
import { MaterialModule } from '../material-module.module';
import { HomepageModule } from '../homepage/homepage.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ConfirmComponent } from '../confirm/confirm.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProfilComponent, ConfirmComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HomepageModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [ProfilComponent],
})
export class ProfilModule {}
