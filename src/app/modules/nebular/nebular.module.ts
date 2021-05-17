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
  NbFormFieldModule,
  NbAutocompleteModule,
  NbTagModule,
  NbChatModule,
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
    NbActionsModule,
    NbCardModule,
    NbFormFieldModule,
    NbAutocompleteModule,
    NbTagModule,
    NbChatModule,
  ],
  imports: [CommonModule],
})
export class NebularModule {}
