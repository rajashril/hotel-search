import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';
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
  CheckOutMinDate: NgbDateStruct;

  constructor(private router: Router,private _hotelService: HotelService) { }

  ngOnInit() {
    this.model = this._hotelService.model;
  }

  onSelect(){
    this._hotelService.model=this.model;
    this.router.navigate(['/result']);
  }

  //min date for check out date
  onCheckInDateSelect(){   
    let CheckInDateFormat = new Date(this.model.checkIn.year, this.model.checkIn.month-1, this.model.checkIn.day);
    var CheckInNextDate = new Date(CheckInDateFormat);
    CheckInNextDate.setDate(CheckInDateFormat.getDate()+1);      
    this.CheckOutMinDate = { year: CheckInNextDate.getFullYear(), month : CheckInNextDate.getMonth() + 1, day: CheckInNextDate.getDate() };
  }
}
