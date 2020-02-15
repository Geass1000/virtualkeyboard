import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Feature Modules
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

const modules = [
  CoreModule,
  SharedModule,
];

// Components
import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';

const components = [
  AppComponent,
  KeyboardComponent,
];

@NgModule({
  imports: [
    BrowserModule,
    ...modules,
  ],
  declarations: [
    ...components,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
