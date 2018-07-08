import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  public tabelData: any = [{ 'name': 'Aatish', 'lastName': 'Sharma', 'Id': 'XYZ67467' },
                      { 'name': 'Aatish', 'lastName': 'Sharma', 'Id': 'ABC67467' },
                      { 'name': 'Aatish', 'lastName': 'Sharma', 'Id': 'TYU67467' },
                      {'name': 'Aatish', 'lastName': 'Sharma', 'Id': 'YTI7467'},
                      {'name': 'Aatish', 'lastName': 'Sharma', 'Id': 'XTR67467'}];
  constructor() { }

  ngOnInit() {
    this.tabelData.forEach((data, index ) => {
         data.isChecked = false;
    });
  }

  chnageStateFun(data) {
    data.isChecked = !data.isChecked;
    console.log(data);
  }

  submitData() {
    console.log(this.tabelData);
  }
 }
