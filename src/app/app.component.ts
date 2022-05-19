import { Component } from '@angular/core';
import { MarbleValue } from './marble/marble.component';

@Component({
  selector: 'rx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public inputTicks: MarbleValue[] = [null, null, null, null, null];
  public outputTicks: MarbleValue[] = [1, null, 0, null, 5];

  public inputTicksChanged(newTicks: MarbleValue[]): void {
    this.inputTicks = newTicks;
  }
}
