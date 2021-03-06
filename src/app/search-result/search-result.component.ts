import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Router } from '@angular/router';
import {DecimalPipe} from "@angular/common";

import { HotelService } from '../services/hotel.service';

const now = new Date();

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.sass'],
  providers: [DecimalPipe]
})
export class SearchResultComponent implements OnInit {

  private model: any = {};
  private checkInDate: string;
  private checkOutDate: string;
  private numberOfGuests: Number;
  private showSpinner: boolean = false;
  private errorMessage;
  private hotelsListData:[];
  private hotelCount;
  private response;
  private occupantsArr = {
    occupants: []
  };
  CheckOutMinDate: NgbDateStruct;

  minDate: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

  constructor(private _hotelService: HotelService, private router: Router, private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    this.model = this._hotelService.model;
    if(this.model.checkIn != undefined && this.model.checkOut != undefined){
      this.triggerSearch(1);
    } else {
      this.router.navigate(['/search']);
    }
  }

  //trigger the search init
  triggerSearch(pageNumber){
    this.showLoadingSpinner();
    this.initializeFilterCriteria();
    this._hotelService.searchHotels(this.checkInDate, this.checkOutDate, this.occupantsArr).subscribe(
      result => {
        this.callStatus(result, pageNumber);
      },
      error => {
        this.errorMessage = error.error.message;
        alert("Erorr ! "+this.errorMessage);
        this.hotelsListData=[];
        this.hideLoadingSpinner();
      }
    );
  }

  //format and initialise hotel filter inputs
  initializeFilterCriteria(){
    this._hotelService.model = this.model;
    this.checkInDate = this.model.checkIn.month+"/"+ this.model.checkIn.day+"/"+ this.model.checkIn.year;
    this.checkOutDate = this.model.checkOut.month+"/"+ this.model.checkOut.day+"/"+ this.model.checkOut.year;
    if(this.model.guest == undefined ){
      this.model.guest = 1;
    }
    this.numberOfGuests = this.model.guest;
    let guestNumber: any;
    guestNumber = this.decimalPipe.transform(this.model.guest);

    //make occupants array
    while(guestNumber != 0){
      this.occupantsArr.occupants.push({
        "type": "Adult",
        "age": 25
      });
      guestNumber = guestNumber - 1;
    }
  }

  //check status of hotels
  callStatus(data, pageNumber){
    this._hotelService.getStatus(data).subscribe(
      result1 => {
        if(result1['status']==="Complete"){
          //if status of hotels is completed then call result
          this._hotelService.getHotels(data, pageNumber)
          .subscribe(
            result2 => {
              this.hotelCount = result2.paging.totalRecords;
              this.hideLoadingSpinner();
              result2.pages = new Array(Math.ceil(result2.paging.totalRecords/result2.paging.pageSize));
              for(let i=0; i< result2.hotels.length; i++){
                let newRattingArray = new Array(result2.hotels[i].rating);
                result2.hotels[i].rattingArray = newRattingArray;
              }
              this.hotelsListData = result2.hotels;
              this.response=result2;
            },
            error => {
              this.errorMessage = error.error.message;
              alert("Erorr ! "+this.errorMessage);
              this.hotelsListData=[];
              this.hideLoadingSpinner();
            }
          );
        }
        else {
          //if status is inpogress then call method again
          this.callStatus(data, pageNumber);
        }
      },
      error => {
        this.errorMessage = error.error.message;
        alert("Erorr ! "+this.errorMessage);
        this.hotelsListData=[];
        this.hideLoadingSpinner();
      }
    );
  }

  //show loading spinner
  showLoadingSpinner() {
    this.showSpinner = true;
  }

  //hide loading spinner
  hideLoadingSpinner() {
    this.showSpinner = false;
  }

  //min date for check out date
  onCheckInDateSelect(){
    let CheckInDateFormat = new Date(this.model.checkIn.year, this.model.checkIn.month-1, this.model.checkIn.day);
    var CheckInNextDate = new Date(CheckInDateFormat);
    CheckInNextDate.setDate(CheckInDateFormat.getDate()+1);
    this.CheckOutMinDate = { year: CheckInNextDate.getFullYear(), month : CheckInNextDate.getMonth() + 1, day: CheckInNextDate.getDate() };
  }

  showNOtImplementedAlert(){
    alert("Not implemented yet");
  }
}
