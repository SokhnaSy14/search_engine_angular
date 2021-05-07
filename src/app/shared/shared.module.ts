import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module.module';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { SliderComponent } from './slider/slider.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DownloadComponent } from './download/download.component';
import { AddProfilComponent } from './add-profil/add-profil.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AutocompleteComponent,
    SliderComponent,
    DownloadComponent,
    AddProfilComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    NavbarComponent,
    SliderComponent,
    AutocompleteComponent,
    DownloadComponent,
    AddProfilComponent,
  ],
})
export class SharedModule {}
