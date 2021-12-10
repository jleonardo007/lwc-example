import { LightningElement } from 'lwc';
import timerService from '../../../machines/timer/timer';

export default class Timer extends LightningElement {
  minutes = null;
  seconds = null;
  service = null;
  state = null;

  connectedCallback() {
    this.service = timerService;
    timerService
      .onTransition((state) => {
        this.state = state;
        this.minutes = state.context.minutes;
        this.seconds = state.context.seconds;
      })
      .start();
  }

  disconnectedCallback() {
    timerService.stop();
  }
}
