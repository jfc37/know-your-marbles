import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputStreamComponent } from './input-stream/input-stream.component';
import { OperationComponent } from './operation/operation.component';
import { OutputStreamComponent } from './output-stream/output-stream.component';
import { MarbleComponent } from './marble/marble.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MarbleValuePickerComponent } from './marble-value-picker/marble-value-picker.component';
import { AddAdditionalInputStreamComponent } from './add-additional-input-stream/add-additional-input-stream.component';

@NgModule({
  declarations: [
    AppComponent,
    InputStreamComponent,
    OperationComponent,
    OutputStreamComponent,
    MarbleComponent,
    MarbleValuePickerComponent,
    AddAdditionalInputStreamComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
