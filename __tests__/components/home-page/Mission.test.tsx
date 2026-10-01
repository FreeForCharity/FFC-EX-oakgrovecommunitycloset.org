import React from 'react'
import { render, screen } from '@testing-library/react'
import Mission from '../../../src/components/home-page/Mission'
import { siteConfig } from '../../../src/lib/site.config'

describe('Mission', () => {
  it('renders the section heading', () => {
    render(<Mission />)
    expect(screen.getByRole('heading', { name: 'Our Mission' })).toBeInTheDocument()
  })

  it("shows the charity's own mission statement", () => {
    render(<Mission />)
    expect(screen.getByText(siteConfig.description)).toBeInTheDocument()
    // The template's copy was Free For Charity's own.
    expect(screen.queryByText(/charity for charities/i)).not.toBeInTheDocument()
  })

  it("shows no mission video (the template's was Free For Charity's)", () => {
    const { container } = render(<Mission />)
    expect(container.querySelector('video')).toBeNull()
  })

  it('mounts under the #mission section landmark id', () => {
    const { container } = render(<Mission />)
    expect(container.querySelector('#mission')).not.toBeNull()
  })
})
