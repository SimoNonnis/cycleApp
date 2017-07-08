import {div, button, p} from '@cycle/dom'
import xs from 'xstream'

export function App ({ DOM }) {
  // INTENT
  const plus$ = DOM.select('.plus').events('click').mapTo(1);
  const minus$ = DOM.select('.minus').events('click').mapTo(-1);

  // STATE
  const number$ = xs.merge(plus$, minus$)
    .fold((prev, curr) => prev + curr, 0);

  // VDOM
  return {
    DOM: number$.map( n =>
      div([
        button('.plus', 'Increment'),
        button('.minus', 'Decrement'),
        p(String(n)),
      ])
    )
  }
}
