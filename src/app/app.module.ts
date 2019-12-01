import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankSearchComponent } from './pages/bank-search/bank-search.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PagerService } from './pager.service';
import { FormsModule } from '@angular/forms';
//import { FilterPipe }from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BankSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
