import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { HotelService } from '../services/hotel.service';

const now = new Date();

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.sass']
})
export class SearchResultComponent implements OnInit {

  model: any = {};
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: Number;
  minDate: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  constructor(private _hotelService: HotelService) { }

  ngOnInit() {
  }

  onSelectResPage(): void{
    this.checkInDate = this.model.checkIn.month+"/"+ this.model.checkIn.day+"/"+ this.model.checkIn.year;
    this.checkOutDate = this.model.checkOut.month+"/"+ this.model.checkOut.day+"/"+ this.model.checkOut.year;
    this.numberOfGuests = this.model.guest;
    this._hotelService.someMethod(this.checkInDate, this.checkOutDate, this.numberOfGuests);
  }
}
