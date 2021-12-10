import { createMachine, interpret, assign } from 'xstate';

const timerControl = {
  initial: 'set',
  states: {
    set: {}
  },
  on: {
    input: {
      target: '.set',
      actions: ['setTimer']
    },
    START: 'running'
  }
};

const timerMachine = createMachine(
  {
    id: 'timer',
    initial: 'idle',
    context: {
      minutes: 1,
      seconds: 0
    },
    states: {
      idle: {
        ...timerControl
      },
      running: {
        invoke: {
          id: 'countDown',
          src: (context) => (callback) => {
            const interval = setInterval(() => {
              if (context.minutes === 0 && context.seconds === 0)
                callback('RESET');

              if (context.seconds > 0 && context.seconds <= 59)
                callback('DECREMENT_SECONDS');
              else if (context.seconds === 0) callback('DECREMENT_MINUTES');
            }, 1000);

            return () => clearInterval(interval);
          }
        },
        on: {
          DECREMENT_SECONDS: {
            target: 'running',
            actions: ['decrementSeconds']
          },
          DECREMENT_MINUTES: {
            target: 'running',
            actions: ['decrementMinutes']
          },
          RESET: {
            target: 'idle',
            actions: 'resetTimer'
          },
          END: 'idle',
          PAUSE: 'paused'
        }
      },
      paused: {
        on: {
          RESTART: 'running',
          RESET: {
            target: 'idle',
            actions: 'resetTimer'
          }
        }
      }
    }
  },
  {
    actions: {
      setTimer: assign({ minutes: (_, event) => event.target.value }),
      resetTimer: assign({ minutes: 1, seconds: 0 }),
      decrementSeconds: assign({ seconds: (context) => context.seconds - 1 }),
      decrementMinutes: assign({
        minutes: (context) => context.minutes - 1,
        seconds: 59
      })
    }
  }
);

const timerService = interpret(timerMachine);

export default timerService;
