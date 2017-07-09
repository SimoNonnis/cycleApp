import {run} from '@cycle/run';
import {makeDOMDriver} from '@cycle/dom';
import {HTTPSource} from '@cycle/http';
import {App} from './app';

const main = App;

const drivers = {
  DOM: makeDOMDriver('#app'),
};

run(main, drivers);
