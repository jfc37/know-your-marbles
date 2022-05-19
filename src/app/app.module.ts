import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputStreamComponent } from './input-stream/input-stream.component';
import { OperationComponent } from './operation/operation.component';
import { OutputStreamComponent } from './output-stream/output-stream.component';
import { MarbleComponent } from './marble/marble.component';
import { ReadonlyMarbleComponent } from './readonly-marble/readonly-marble.component';

@NgModule({
  declarations: [
    AppComponent,
    InputStreamComponent,
    OperationComponent,
    OutputStreamComponent,
    MarbleComponent,
    ReadonlyMarbleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
