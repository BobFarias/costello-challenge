import { Component, OnInit } from '@angular/core';
import { CtgovApiService } from 'src/app/services/ctgov-api.service';
import {FormGroup, FormControl} from '@angular/forms';

import * as moment from 'moment';
interface IStatusFilter {
  value: string;
}
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  //NUMBER OF TRIASL
  numTrials = 0;

  //STATES FOR THE FILTERS
  status: IStatusFilter[] = [
    {value: 'Recruiting'},
    {value: 'Active'},
    {value: 'Completed'},
    {value: 'Unknown'},
  ];
  
  condition: "";
  selectedStatus: string;
  primaryCompletionDateFrom: ""; // Takes format 'YYYY/MM/DD'
  primaryCompletionDateUntil: ""; // Takes format 'YYYY/MM/DD'


  constructor(
    private ctgovService: CtgovApiService
  ) { }

  getTrialData() {
    const formatedDate = (date: string) => {
      if(!date) return null;
      return moment(date).format("YYYY-MM-DD")
    };

    this.ctgovService.loadTrialData(
      this.selectedStatus,
      this.condition,
      formatedDate(this.primaryCompletionDateFrom),
      formatedDate(this.primaryCompletionDateUntil)
    );  
    this.ctgovService.numTrials$.subscribe(numTrials => {
      this.numTrials = numTrials;
    });

   }

  ngOnInit(): void {
    this.getTrialData();
  }
}
