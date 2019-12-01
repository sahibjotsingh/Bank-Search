import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankSearchComponent } from './pages/bank-search/bank-search.component';

const routes: Routes = [
  { path: '', redirectTo: 'bank-search', pathMatch: 'full' },
  { path: 'bank-search', component: BankSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
