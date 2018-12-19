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

  hotelsListData:[];

  ngOnInit() {
    this.model = this._hotelService.model;
    this.triggerSearch();
  }

  initializeFilterCriteria(){
    this._hotelService.model=this.model;
    this.checkInDate = this.model.checkIn.month+"/"+ this.model.checkIn.day+"/"+ this.model.checkIn.year;
    this.checkOutDate = this.model.checkOut.month+"/"+ this.model.checkOut.day+"/"+ this.model.checkOut.year;
    this.numberOfGuests = this.model.guest;
  }

  triggerSearch(){
    this.initializeFilterCriteria();
    this._hotelService.searchHotels(this.checkInDate, this.checkOutDate, this.numberOfGuests).subscribe(
      result => {
        this.callStatus(result);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  callStatus(data){
    this._hotelService.getStatus(data).subscribe(
      result1 => {
        console.log(result1);
        if(result1['status']==="Complete"){
          this._hotelService.getHotels(data)
          .subscribe(
            result2 => {
              this.hotelsListData = result2.hotels;
              console.log(this.hotelsListData);
            },
            error => {
              console.log("Error", error);
            }
          );
        }
        else{
          this.callStatus(data);
        }
      },
      error => {
        console.log("Error", error);
      }
    );
  }
}
