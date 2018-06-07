import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {NgDatatableModule} from "../../projects/ng-datatable/src/lib/ng-datatable.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
