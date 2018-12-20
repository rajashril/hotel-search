import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { HotelsSearchRequestJson } from '../models/hotel-search-request-json';

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
  model:any = {};
  constructor(private httpClient: HttpClient,private hotelsSearchRequestJson:HotelsSearchRequestJson) { }

  //get session ID from init call
  searchHotels(checkInDate, checkOutDate, occupantsArr):Observable<any> {
    this.hotelsSearchRequestJson.initRequestJson.stayPeriod.start = checkInDate;
    this.hotelsSearchRequestJson.initRequestJson.stayPeriod.end = checkOutDate;
    this.hotelsSearchRequestJson.initRequestJson.roomOccupancies[0] = occupantsArr;
    return this.httpClient.post("https://public-be.oski.io/hotel/v1.0/search/init",this.hotelsSearchRequestJson.initRequestJson,httpOptions)
  }

  //get hotel status
  getStatus(data):Observable<any>{
    return this.httpClient.post("https://public-be.oski.io/hotel/v1.0/search/status", data, httpOptions );
  }

  //get hotel search results
  getHotels(data, pageNumber):Observable<any>{
    this.hotelsSearchRequestJson.searchRequestJson.sessionId=data.sessionId;
    this.hotelsSearchRequestJson.searchRequestJson.paging.pageNo=pageNumber;
    return this.httpClient.post("https://public-be.oski.io/hotel/v1.0/search/results",this.hotelsSearchRequestJson.searchRequestJson, httpOptions );
  }
}
