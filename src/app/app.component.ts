import { Component } from '@angular/core';
import { MarbleValue } from './marble/marble.component';

@Component({
  selector: 'rx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public inputTicks: MarbleValue[] = [
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
  ];
  public outputTicks: MarbleValue[] = [
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
  ];

  public inputTicksChanged(newTicks: MarbleValue[]): void {
    console.log('ticks changed', newTicks);
    this.inputTicks = newTicks;
    this.outputTicks = newTicks;
  }
}
