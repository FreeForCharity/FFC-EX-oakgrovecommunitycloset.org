import React from 'react'
import { render, screen } from '@testing-library/react'
import Team from '../../../src/components/home-page/TheFreeForCharityTeam'
import { PENDING_TEXT, siteConfig } from '../../../src/lib/site.config'

// Oak Grove Community Closet has not published its leadership yet: the roster
// is empty and 'team' is pending. The populated layout runs against a fixture
// (never Free For Charity's own staff).
const fixture = [
  { name: 'Alex Example', role: 'Coordinator' },
  { name: 'Blair Example', role: 'Treasurer' },
  { name: 'Casey Example', role: 'Volunteer Lead' },
]

function renderWithFixture() {
  let result: ReturnType<typeof render> | undefined
  jest.isolateModules(() => {
    jest.doMock('@/data/team', () => ({ team: fixture, configuredTeam: fixture }))
    const Populated = require('../../../src/components/home-page/TheFreeForCharityTeam').default
    result = render(<Populated />)
  })
  return result!
}

describe('TheFreeForCharityTeam', () => {
  it('renders the section heading', () => {
    render(<Team />)
    expect(screen.getByRole('heading', { name: `The ${siteConfig.name} Team` })).toBeInTheDocument()
  })

  it('mounts under the #team section landmark id', () => {
    const { container } = render(<Team />)
    expect(container.querySelector('#team')).not.toBeNull()
  })

  it('shows a visible, non-link placeholder while the team is pending', () => {
    render(<Team />)
    expect(screen.getByText(PENDING_TEXT).closest('a')).toBeNull()
    expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0)
  })

  it('renders a card per member with initials monograms and no photos', () => {
    const { container } = renderWithFixture()
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(fixture.length)
    expect(container.querySelectorAll('img').length).toBe(0)
    expect(screen.queryByText(PENDING_TEXT)).not.toBeInTheDocument()
  })
})

describe('TheFreeForCharityTeam with an empty roster that is NOT pending', () => {
  const originalPending = siteConfig.pending
  afterEach(() => {
    siteConfig.pending = originalPending
  })

  it('renders nothing', () => {
    siteConfig.pending = (originalPending ?? []).filter((f) => f !== 'team')
    const { container } = render(<Team />)
    expect(container.firstChild).toBeNull()
  })
})
