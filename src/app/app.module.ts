import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module.module';
import { HomepageModule } from './homepage/homepage.module';
import { ProfilModule } from './profil/profil.module';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ResultModule } from './result/result.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from './config/config.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    HomepageModule,
    ProfilModule,
    ResultModule,
    SharedModule,
    ConfigModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
