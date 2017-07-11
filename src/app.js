import {div, h1, label, p, input, hr, ul, li } from '@cycle/dom';
import xs from 'xstream';

const category = 'github';

export function App ({ DOM, HTTP, time }) {

  function inputVal$(selector) {
    return DOM.select(selector).events('input')
      .map(e => e.target.value)
      .startWith('');
  }

  const searchRequest$ =
    xs.combine(inputVal$('.desc'), inputVal$('.lang'), inputVal$('.stars'))
      .filter( query => query[0].length > 0)
      .compose(time.debounce(500))
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

  const searchResults$ = HTTP.select(category)
    .flatten()
    .map(res => res.body.items)
    .startWith([]);

  // VDOM
  return {
    DOM: view(searchResults$),
    HTTP: searchRequest$,
  }
}

// Components
function labeledField(labelText, selector, inputType) {
  return label([
    p(labelText),
    input(selector, { attrs: { type: inputType }}),
  ])
}

function view(Results$) {
  return Results$.map((results) =>
    div([
      div([
        h1('Github Search'),
        div([
          labeledField('Description',  '.desc', 'text'),
          labeledField('Language', '.lang', 'text'),
          labeledField('Min Stars', '.stars', 'text'),
        ]),
        hr(),
        ul('.search-results', results.map(result =>
          li('.search-result', [
            a({ attrs: { href: result.html_url } }, result.name)
          ])
        ))
      ])
    ])
  );
}

// Helpers
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
