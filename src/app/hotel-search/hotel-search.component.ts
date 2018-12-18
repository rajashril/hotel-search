import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Router } from '@angular/router';
import { HotelsListData } from '../models/hotel-data';

const now = new Date();

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.sass']
})
export class HotelSearchComponent implements OnInit {

  model: any = {};
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: Number;
  hotelsListData: HotelsListData;

  minDate: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelect(){
    localStorage.setItem("filterCriteria", JSON.stringify(this.model));
    this.router.navigate(['/result']);
  }
}
