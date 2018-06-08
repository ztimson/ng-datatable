import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgDatatableComponent} from './ng-datatable.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [NgDatatableComponent],
  exports: [NgDatatableComponent]
})
export class NgDatatableModule {}
