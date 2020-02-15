import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Directives
import { KeyEventDirective } from './directives/key-event-directive';
import { ClickDelegateDirective } from './directives/click-delegate.directive';

const directives = [
  KeyEventDirective,
  ClickDelegateDirective,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...directives
  ],
  exports: [
    ...directives,
  ],
})
export class SharedModule { }
