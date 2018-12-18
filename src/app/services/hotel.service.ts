import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

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
  private initRequestJson={
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
      "start": "",
      "end": ""
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
  };

  searchHotels(checkInDate, checkOutDate, numberOfGuests):Observable<any> {
    this.initRequestJson.stayPeriod.start=checkInDate;
    this.initRequestJson.stayPeriod.end=checkOutDate;
    return this.httpClient.post("https://public-be.oski.io/hotel/v1.0/search/init",this.initRequestJson,httpOptions)
}

getStatus(data):Observable<any>{
  return this.httpClient.post("https://public-be.oski.io/hotel/v1.0/search/status", data, httpOptions );
}

getHotels(data):Observable<any>{
  return this.httpClient.post("https://public-be.oski.io/hotel/v1.0/search/results",
  {
    "sessionId": data.sessionId,
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
  , httpOptions );
}
}
