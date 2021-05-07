import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { MaterialModule } from '../material-module.module';
import { ProfilModule } from '../profil/profil.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [ConfigComponent],
  imports: [CommonModule, MaterialModule, ProfilModule, SharedModule],
  exports: [ConfigComponent],
})
export class ConfigModule {}
