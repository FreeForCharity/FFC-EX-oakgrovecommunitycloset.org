// Impact / results statistics shown in the "Results" section of the home page.
// To update the heading or the stat cards, edit this file — no need to touch
// the component. `value` is rendered as-is; if it is a plain integer string the
// component animates the count up to it.

export type ResultStat = {
  value: string
  label: string
}

// The template's figures were FFC's own 2023 results, so none
// ship until the charity supplies its own (the section self-hides while
// `stats` is empty).
export const results: { heading: string; stats: ResultStat[] } = {
  heading: 'Results',
  stats: [],
}
