import {div, h1, label, p, input, hr, ul, li } from '@cycle/dom'
import xs from 'xstream'

export function App ({ DOM, HTTP }) {
  // VDOM
  let vdom$ = xs.of(
    div([
      h1('GitHub Search'),
      div([
        labeledField('Description', '.desc', 'text'),
        labeledField('Language', '.lang', 'text'),
        labeledField('Stars', '.stars', 'text'),
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

// Components
function labeledField(labelText, selector, inputType) {
  return label([
    p(labelText),
    input(selector, { attrs: { type: inputType }}),
  ])
}

// Intent
function search(sources) {
  const category = 'github';

  function inputVal$(selector) {
    return sources.DOM.select(selector).events('input')
      .map(e => e.target.value)
      .startWith('');
  }

  const searchRequest$ =
    xs.combine(inputVal$('.desc'), inputVal$('.lang', inputVal$('.stars')))
      .filter( query => query[0].length > 0)
      .compose(sources.time.debounce(500))
      .map(([desc, lang, stars]) => {
        const tearms = [search];

        if (isNumeric(stars)) {
          terms.push(`stars:">=${stars}"`);
        }
        if (language !== '') {
          terms.push(`language:"${language}"`);
        }
        return {
          q: terms.join(' ')
        };
      })
      .map(query => ({
        url: 'https://api.github.com/search/repositories',
        query,
        category
      }))
      .debug('criteria');
}

// Helpers
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
