import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  { path: 'serach', component: HotelSearchComponent },
  { path: 'result', component: SearchResultComponent },
  { path: '',
    redirectTo: '/serach',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
