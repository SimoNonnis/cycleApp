import { label, p, input } from '@cycle/dom';

export default function labeledField(labelText, selector, inputType) {
  return label([
    p(labelText),
    input(selector, { attrs: { type: inputType }}),
  ])
}
