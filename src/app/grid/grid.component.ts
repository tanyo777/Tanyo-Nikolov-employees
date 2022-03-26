import { APP_ID, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { IEmployeeRecord } from '../interfaces/employee';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnChanges {
  @Input() csvData!: IEmployeeRecord[];

  rowData!: IEmployeeRecord[];

  columnDefs: ColDef[];

  constructor() {
    this.columnDefs = [
      { field: 'EmpID' },
      { field: 'ProjectID' },
      { field: 'DateFrom' },
      { field: 'DateTo' },
    ];
    this.rowData = [];
  }

  ngOnInit(): void {
    this.pairEmployeesHandler();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.pairEmployeesHandler();
  }

  // logic for searching for pairs
  pairEmployeesHandler(): void {
    this.rowData = this.formatCSVData();
    console.log(this.rowData);
  }

  // format the csv data and check for DateTo null value
  formatCSVData(): IEmployeeRecord[] {
    const dataContainer: IEmployeeRecord[] = [];
    this.csvData.map((row: any) => {
      const rowObject: any = {
        EmpID: row?.['EmpID'],
        ProjectID: row?.[' ProjectID'],
        DateFrom: row?.[' DateFrom'],
        DateTo: row?.[' DateTo'] == "NULL" ? new Date().toISOString().slice(0, 10) : row?.[' DateTo'],
      };

      dataContainer.push(rowObject);
    });
    return dataContainer;
  }

  initializeGrid(grid: AgGridAngular) {
    grid.api.sizeColumnsToFit();
  }

}
