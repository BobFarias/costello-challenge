import { Component, OnInit } from '@angular/core';
import { CtgovApiService } from 'src/app/services/ctgov-api.service';

import { CTGovItem, CTGovResponse } from './interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})

export class HomeComponent implements OnInit {
  dataSource = undefined;
  displayedColumns: string[] = ['#', 'NCTId', 'Title', 'Condition', 'Status', 'Primary Completion Date'];

  constructor(
    private ctgovService: CtgovApiService
  ) { }

  ngOnInit(): void {
    this.ctgovService.trials$.subscribe(trials => {
      this.dataSource = trials;
    });
   }
}
