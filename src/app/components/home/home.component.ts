import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CtgovApiService } from 'src/app/services/ctgov-api.service';

import { CTGovItem } from './interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})

export class HomeComponent implements OnInit {
  tableData = undefined;
  
  dataSource: MatTableDataSource<CTGovItem>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataObs$: Observable<any>;


  displayedColumns: string[] = ['#', 'NCTId', 'Title', 'Condition', 'Status', 'Primary Completion Date'];

  pageIndex:number;
  pageSize:number;
  length:number;

  constructor(
    private ctgovService: CtgovApiService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  public getTrialData(){
    this.ctgovService.trials$.subscribe(trials => {
      //UPDATE TABLE DATA WITH ALL THE ARRAYS
      this.tableData = trials;

      //UPDATE THE STATE WHICH WILL SHOW ON THE TABLE ACCORDING TO THE PAGINATION
      this.dataSource = new MatTableDataSource<CTGovItem>(trials);
      
      //PAGINATION CONFIG
      this.length = trials.length;
      this._changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataObs$ = this.dataSource.connect();
    });
  }

  ngOnInit(): void {
    this.getTrialData();
  }
}
