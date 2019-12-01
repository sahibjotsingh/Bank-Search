import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  async getBankDetails(city: string) {

    let url = `https://vast-shore-74260.herokuapp.com/banks?city=${city}`;

    if (localStorage.getItem(url)) {
      const cached = JSON.parse(localStorage.getItem(url));
      return cached;
    }

    else {
      let response = await this.http.get<any[]>(url).toPromise();

      response.forEach(element => {
        element.favourite = false;
      });
      
      localStorage.setItem(url, JSON.stringify(response));
      return response;
    }

  }

}
