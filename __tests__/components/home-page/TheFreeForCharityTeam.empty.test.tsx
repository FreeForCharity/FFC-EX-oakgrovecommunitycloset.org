import React from 'react'
import { render } from '@testing-library/react'

// Self-hiding behavior (FFC-Cloudflare-Automation#816 Part B): a rebranded fork
// that empties src/data/team/*.json should render NOTHING here rather than the
// FFC sample team. Mock the data module to the empty case for this file only;
// the populated render is covered by TheFreeForCharityTeam.test.tsx.
jest.mock('@/data/team', () => ({ team: [], configuredTeam: [] }))

import Team from '../../../src/components/home-page/TheFreeForCharityTeam'
import { siteConfig } from '../../../src/lib/site.config'

describe('TheFreeForCharityTeam — self-hiding', () => {
  // A pending team renders a placeholder instead (see TheFreeForCharityTeam.test.tsx);
  // self-hiding applies to an empty team that is NOT pending.
  const originalPending = siteConfig.pending
  beforeEach(() => {
    siteConfig.pending = (originalPending ?? []).filter((f) => f !== 'team')
  })
  afterEach(() => {
    siteConfig.pending = originalPending
  })

  it('renders nothing when the team data is empty', () => {
    const { container } = render(<Team />)
    expect(container).toBeEmptyDOMElement()
  })
})
