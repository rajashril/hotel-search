import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.sass']
})
export class HotelSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSelect(): void {
    alert("working");
  }

}
