import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { BankDetail } from '../../models/bank-detail.model';
import { ApiService } from '../../api.service';
import { PagerService } from '../../pager.service';
//import { FilterPipe } from '.././../filter.pipe';

@Component({
  selector: 'app-bank-search',
  templateUrl: './bank-search.component.html',
  styleUrls: ['./bank-search.component.css']
})
export class BankSearchComponent implements OnInit {

  constructor(private api: ApiService, private http: HttpClient, private pagerService: PagerService) { }

  query: string = '';
  cities: string[] = ['MUMBAI', 'DELHI', 'HYDERABAD', 'BANGALORE', 'PUNE'];
  pageSizes: number[] = [10, 20, 30, 40];
  selectedCity: string = this.cities[0];
  selectedPageSize: number = this.pageSizes[0];

  private allItems: BankDetail[];
  private filteredItems: BankDetail[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
    this.filterByCity();
  }

  changed() {
    let url = `https://vast-shore-74260.herokuapp.com/banks?city=${this.selectedCity}`;
    localStorage.setItem(url, JSON.stringify(this.allItems));
  }

  async filterByCity() {
    let data = await this.api.getBankDetails(this.selectedCity);

    this.allItems = data;
    this.filteredItems = data;
    this.filterBySearchQuery();
  }

  filterBySearchQuery() {
    this.query = this.query.trim();

    if (!this.allItems) {
      this.filteredItems = [];
    }
    else if (!this.query) {
      this.filteredItems = this.allItems;
      this.setPage(1);
    }
    else {
      const queryLower = this.query.toLowerCase();
      this.filteredItems = this.allItems.filter(it => it.ifsc.toLowerCase().includes(queryLower) || it.bank_name.toLowerCase().includes(queryLower) || it.address.toLowerCase().includes(queryLower));
      this.setPage(1);
    }
  }

  filterByFavourite() {
      this.filteredItems = this.filteredItems.filter(it => it.favourite == true);
      this.setPage(1);
  }

  changePageSize() {
    this.setPage(1);
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.filteredItems.length, page, this.selectedPageSize);

    // get current page of items
    this.pagedItems = this.filteredItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


}



