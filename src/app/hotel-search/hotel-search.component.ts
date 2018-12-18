import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; 

import { HotelService } from '../services/hotel.service';

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

  minDate: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

  constructor(private _hotelService: HotelService, private router: Router) { }

  ngOnInit() {
  }

  onSelect(): void {
    this.checkInDate = this.model.checkIn.month+"/"+ this.model.checkIn.day+"/"+ this.model.checkIn.year;
    this.checkOutDate = this.model.checkOut.month+"/"+ this.model.checkOut.day+"/"+ this.model.checkOut.year;
    this.numberOfGuests = this.model.guest;
    this._hotelService.someMethod(this.checkInDate, this.checkOutDate, this.numberOfGuests);
    this.router.navigate(['/result']);
  }
}
