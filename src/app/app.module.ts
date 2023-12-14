import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {NgDatatableModule} from "../../projects/ng-datatable/src/lib/ng-datatable.module";

import {AppComponent} from './app.component';

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
export class AppModule {}
