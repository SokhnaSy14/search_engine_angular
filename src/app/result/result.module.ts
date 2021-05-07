import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module.module';
import { ResultComponent } from './result.component';
import { ListComponent } from '../list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageModule } from '../homepage/homepage.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ResultComponent, ListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HomepageModule,
    SharedModule,
  ],
  exports: [ListComponent, ResultComponent],
})
export class ResultModule {}
