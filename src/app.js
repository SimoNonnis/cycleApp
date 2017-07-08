import {div, button, p} from '@cycle/dom'
import xs from 'xstream'

export function App ({ DOM }) {
  // INTENT
  const plus$ = DOM.select('.plus').events('click').mapTo(1);
  const minus$ = DOM.select('.minus').events('click').mapTo(-1);

  // STATE

  // VDOM
  return {
    DOM: xs.of(
      div([
        button('.plus', 'Increment'),
        button('.minus', 'Decrement'),
        p('0'),
      ])
    )
  }
}
