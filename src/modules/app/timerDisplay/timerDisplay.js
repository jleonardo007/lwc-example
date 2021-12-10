import { LightningElement, api } from 'lwc';

export default class TimerDisplay extends LightningElement {
  @api minutes;
  @api seconds;

  get formatMinutes() {
    return this.minutes < 10 ? `0${this.minutes}` : this.minutes;
  }

  get formatSeconds() {
    return this.seconds < 10 ? `0${this.seconds}` : this.seconds;
  }
}
