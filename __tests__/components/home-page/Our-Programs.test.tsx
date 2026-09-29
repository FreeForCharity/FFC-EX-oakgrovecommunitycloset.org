import React from 'react'
import { render, screen } from '@testing-library/react'
import OurPrograms from '../../../src/components/home-page/Our-Programs'
import { siteConfig } from '../../../src/lib/site.config'

describe('Our-Programs', () => {
  // This site turns the section off (sections.showPrograms = false); exercise the
  // component itself with the flag on.
  const original = siteConfig.sections.showPrograms
  beforeAll(() => {
    siteConfig.sections.showPrograms = true
  })
  afterAll(() => {
    siteConfig.sections.showPrograms = original
  })

  it('renders the section heading', () => {
    render(<OurPrograms />)
    expect(screen.getByRole('heading', { name: /Our Programs/i })).toBeInTheDocument()
  })

  it('mounts under the #programs section landmark id', () => {
    const { container } = render(<OurPrograms />)
    expect(container.querySelector('#programs')).not.toBeNull()
  })
})
