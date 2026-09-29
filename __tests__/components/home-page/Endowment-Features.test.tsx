import React from 'react'
import { render, screen } from '@testing-library/react'
import EndowmentFeatures from '../../../src/components/home-page/Endowment-Features'
import { siteConfig } from '../../../src/lib/site.config'

describe('Endowment-Features', () => {
  // This site turns the section off (sections.showEndowment = false); exercise the
  // component itself with the flag on.
  const original = siteConfig.sections.showEndowment
  beforeAll(() => {
    siteConfig.sections.showEndowment = true
  })
  afterAll(() => {
    siteConfig.sections.showEndowment = original
  })

  it('renders the section heading', () => {
    render(<EndowmentFeatures />)
    expect(
      screen.getByRole('heading', { name: `${siteConfig.name} Endowment Features` })
    ).toBeInTheDocument()
  })
})
