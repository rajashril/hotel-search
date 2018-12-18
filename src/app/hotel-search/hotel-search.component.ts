import { Component, OnInit } from '@angular/core';

import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.sass']
})
export class HotelSearchComponent implements OnInit {


    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: Number;

  constructor(private _hotelService: HotelService) { }

  ngOnInit() {

  }

  onSelect(checkInVal, checkOutVal, guestNum): void {
    this.checkInDate = checkInVal.month+"/"+ checkInVal.day+"/"+ checkInVal.year;
    this.checkOutDate = checkOutVal.month+"/"+ checkOutVal.day+"/"+ checkOutVal.year;
    this.numberOfGuests = guestNum;
    this._hotelService.someMethod(this.checkInDate, this.checkOutDate, this.numberOfGuests);
  }

}
