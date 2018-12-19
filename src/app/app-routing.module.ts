import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  { path: 'search', component: HotelSearchComponent },
  { path: 'result', component: SearchResultComponent },
  { path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
