import {div, h1, label, p, input, hr, ul, li } from '@cycle/dom'
import xs from 'xstream'

export function App ({ DOM, HTTP }) {
  // VDOM
  let vdom$ = xs.of(
    div([
      h1('GitHub Search'),
      div([
        labeledField('text', 'Description'),
        labeledField('text', 'Language'),
        labeledField('text', 'Stars'),
      ]),
      hr(),
      div([
        ul()
      ])
    ])
  );

  return {
    DOM: vdom$,
  }
}

function labeledField(inputType, labelText) {
  return label([
    p(labelText),
    input({ attrs: { type: inputType}}),
  ])
}
