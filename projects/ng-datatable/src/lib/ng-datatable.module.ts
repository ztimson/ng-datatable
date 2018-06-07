import {NgModule} from '@angular/core';
import {NgDatatableComponent} from './ng-datatable.component';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [NgDatatableComponent],
  exports: [NgDatatableComponent]
})
export class NgDatatableModule { }
