import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbSidebarModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbMenuModule,
} from '@nebular/theme';

@NgModule({
  exports: [
    NbCardModule,
    NbButtonModule,
    NbSidebarModule,
    NbAccordionModule,
    NbButtonModule,
    NbUserModule,
    NbIconModule,
    NbActionsModule,
    NbSearchModule,
    NbMenuModule,
    NbActionsModule,
    NbCardModule,
  ],
  imports: [CommonModule],
})
export class NebularModule {}
