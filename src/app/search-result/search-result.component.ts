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

  model: any = {};
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: Number;
  showSpinner: boolean = false;
  private loadingIcon = require("../../img/Loading_icon.gif");

  minDate: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

  constructor(private _hotelService: HotelService, private router: Router, private decimalPipe: DecimalPipe) { }

  hotelsListData:[];
  hotelCount;
  occupantsArr = {
    occupants: []
  };

  ngOnInit() {
    this.model = this._hotelService.model;
    if(this.model.checkIn != undefined && this.model.checkOut != undefined){
      this.showLoadingSpinner();
      this.triggerSearch();
    } else {
      this.router.navigate(['/search']);
    }
  }

  //trigger the search init
  triggerSearch(){
    this.initializeFilterCriteria();
    this._hotelService.searchHotels(this.checkInDate, this.checkOutDate, this.occupantsArr).subscribe(
      result => {
        this.callStatus(result);
      },
      error => {
        console.log("Error", error);
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
    let guestNumber: Number;
    guestNumber = this.decimalPipe.transform(this.model.guest);
    
    //make occupants array
    while(guestNumber != 0){
      this.occupantsArr.occupants.push({ 
        "type": "Adult",
        "age": 25
      });
      guestNumber--;
    }
    console.log(this.occupantsArr);
  }

  //check status of hotels
  callStatus(data){
    this._hotelService.getStatus(data).subscribe(
      result1 => {
        console.log(result1);
        if(result1['status']==="Complete"){
          //if status of hotels is completed then call result 
          this._hotelService.getHotels(data)
          .subscribe(
            result2 => {
              this.hotelsListData = result2.hotels;
              this.hotelCount = result2.hotels.length;
              this.hideLoadingSpinner();
              // for(let i=0; i< this.hotelsListData.length-1; i++){
              //   let ratings: Number;
              //   let ratingArr: [];
              //   ratings = this.decimalPipe.transform(this.hotelsListData[i].rating);
                
              //   for(let j=0; j< ratings-1; j++){
              //     ratingArr.push(j);
              //   }
              //   this.hotelsListData[i].rating = ratingArr;
              //   //console.log(rating);
              // }
              console.log(this.hotelsListData);
            },
            error => {
              console.log("Error", error);
            }
          );
        }
        else {
          //if status is inpogress then call method again
          this.callStatus(data);
        }
      },
      error => {
        console.log("Error", error);
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

}
