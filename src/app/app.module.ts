import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Feature Modules
import { CoreModule } from './core/core.module';

const modules = [
  CoreModule,
];

// Components
import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';

const components = [
  AppComponent,
  KeyboardComponent,
];

// Directives
import { KeyEventDirective } from './shared/key-event-directive';

const directives = [
  KeyEventDirective,
];

@NgModule({
  imports: [
    BrowserModule,
    ...modules,
  ],
  declarations: [
    ...components,
    ...directives
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
