import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
  ],
  imports: [
    BrowserModule,
    NgxCsvParserModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
