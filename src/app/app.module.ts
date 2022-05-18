import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputStreamComponent } from './input-stream/input-stream.component';
import { OperationComponent } from './operation/operation.component';
import { OutputStreamComponent } from './output-stream/output-stream.component';

@NgModule({
  declarations: [
    AppComponent,
    InputStreamComponent,
    OperationComponent,
    OutputStreamComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
