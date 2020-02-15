import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Directives
import { KeyEventDirective } from './directives/key-event-directive';

const directives = [
  KeyEventDirective,
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
