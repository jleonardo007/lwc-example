import { LightningElement, api } from 'lwc';

export default class TimerControls extends LightningElement {
  @api state;
  @api service;
  @api minutes;

  setMinutes(e) {
    this.service.send(e);
  }

  initTimer() {
    if (this.state.value.idle === 'set') this.service.send('START');
    if (this.state.value === 'paused') this.service.send('RESTART');
  }

  pauseTimer() {
    this.service.send('PAUSE');
  }

  resetTimer() {
    this.service.send('RESET');
  }

  get isPaused() {
    return this.state.value === 'paused' || this.state.value.idle === 'set';
  }
}
