import { Component } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { Subscription } from 'rxjs';
import { IEmployeeRecord } from './interfaces/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  parserSubscription!: Subscription;

  csvData: IEmployeeRecord[];

  isGridShown: boolean;

  constructor(private csvParser: NgxCsvParser) {
    this.isGridShown = false;
    this.csvData = [];
  }


  // will trigger when we select a file
  onSelectFileHandler(e: any): void {
    const file: File = e.target.files[0];
    if(file) {
      this.parserSubscription = this.csvParser.parse(file, { header: true, delimiter: ','}).subscribe({
        next: (csvData: any) => {
          this.csvData = csvData;
          this.isGridShown = true;
        },
        error: (err: Error) => {
          console.log(err.message);
        }
      });
    } else {
      this.parserSubscription.unsubscribe();
      this.csvData = [];
      this.isGridShown = false;
    }
  }
}
