import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'oski-tenantId': 'Demo'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  http: HttpClient;
  constructor(private httpClient: HttpClient) { }

  someMethod(checkInDate, checkOutDate, numberOfGuests) {

    this.httpClient.post("https://public-be.oski.io/hotel/v1.0/search/init",
    {
      "currency": "USD",
      "posId": "hbg3h7rf28",
      "orderBy": "price asc, rating desc",
      "roomOccupancies": [
        {
          "occupants": [
            {
              "type": "Adult",
              "age": 25
            }
          ]
        }
      ],
      "stayPeriod": {
        "start": checkInDate,
        "end": checkOutDate
      },
      "bounds": {
        "circle": {
          "center": {
            "lat": 49.0097,
            "long": 2.5479
          },
          "radiusKm": 50.5
        }
      }
    },
    httpOptions
  )
  .subscribe(
    data => {
      this.callStatus(data);
      this.callResult();
    },
    error => {
      console.log("Error", error);
    }
  );
}

callStatus(data) {
  let gotStatus=false;
  while (!gotStatus) {
    this.httpClient.post("https://public-be.oski.io/hotel/v1.0/search/status", data, httpOptions )
    .subscribe(
      data1 => {
        console.log(data1);
        gotStatus= data1['status']=="Completed";
      },
      error => {
        console.log("Error", error);
      }
    );
  }
}
callResult(){
  this.httpClient.post("https://public-be.oski.io/hotel/v1.0/search/results",
  {
    "sessionId": "",
    "paging": {
      "pageNo": 1,
      "pageSize": 10,
      "orderBy": "price asc, rating desc"
    },
    "optionalDataPrefs": [
      "All"
    ],
    "currency": "USD",
    "contentPrefs": [
      "Basic",
      "Activities",
      "Amenities",
      "Policies",
      "AreaAttractions",
      "Descriptions",
      "Images",
      "CheckinCheckoutPolicy",
      "All"
    ],
    "filters": {
      "minHotelPrice": 1,
      "maxHotelPrice": 10000,
      "minHotelRating": 1,
      "maxHotelRating": 5,
      "hotelChains": [
        "Novotel",
        "Marriott",
        "Hilton",
        "Accor"
      ],
      "allowedCountry": "FR"
    }
  }
  , httpOptions )
  .subscribe(
    data2 => {
      console.log(data2);
    },
    error => {
      console.log("Error", error);
    }
  );
}
}
