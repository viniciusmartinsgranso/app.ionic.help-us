import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewOccurrencePage } from './new-occurrence.page';

const routes: Routes = [
  {
    path: '',
    component: NewOccurrencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOccurrencePageRoutingModule {}
