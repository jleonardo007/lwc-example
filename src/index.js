import { createElement } from 'lwc';
import Timer from 'app/timer';

const app = createElement('my-app', { is: Timer });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
