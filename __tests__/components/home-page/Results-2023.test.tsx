import React from 'react'
import { render, screen } from '@testing-library/react'

// ResultCard -> AnimatedNumber uses native IntersectionObserver + matchMedia
// (stubbed in jest.setup.js to report prefers-reduced-motion: reduce), so the
// static value path is taken here.
import Results from '../../../src/components/home-page/Results-2023'
import { results } from '../../../src/data/results'

const fixture = {
  heading: 'Results - Example',
  stats: [
    { value: '120', label: 'Families served' },
    { value: '15', label: 'Volunteers' },
  ],
}

// This charity ships no results (the template's were Free For Charity's own
// 2023 figures), so the populated section runs against a fixture pushed into
// the shared data module for the test and removed afterwards.
function renderWithFixture() {
  const originalHeading = results.heading
  results.heading = fixture.heading
  results.stats.push(...fixture.stats)
  try {
    return render(<Results />)
  } finally {
    results.heading = originalHeading
    results.stats.splice(results.stats.length - fixture.stats.length)
  }
}

describe('Results-2023', () => {
  it('self-hides while the charity has supplied no results (the shipped state)', () => {
    const { container } = render(<Results />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the section heading', () => {
    renderWithFixture()
    expect(screen.getByRole('heading', { level: 2, name: fixture.heading })).toBeInTheDocument()
  })

  it('mounts under the #results section landmark id', () => {
    const { container } = renderWithFixture()
    expect(container.querySelector('#results')).not.toBeNull()
  })

  it('renders one stat card per stat', () => {
    const { container } = renderWithFixture()
    // The section heading is an <h2>; each ResultCard wraps its value in an
    // <h3> (one level below the section).
    expect(container.querySelectorAll('h2').length).toBe(1)
    expect(container.querySelectorAll('h3').length).toBe(fixture.stats.length)
  })
})
