import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from '../../../src/components/home-page/Hero'
import { siteConfig } from '../../../src/lib/site.config'

describe('Hero', () => {
  it('renders the welcome headline', () => {
    render(<Hero />)
    // The heading mixes text with a <br/>, so the rendered DOM is two text
    // nodes inside the same <h1>. Match the whole heading by accessible name
    // and let RTL collapse whitespace.
    expect(
      screen.getByRole('heading', { level: 1, name: `Welcome to ${siteConfig.name}` })
    ).toBeInTheDocument()
  })

  it("shows the charity's own tagline, not the template's", () => {
    render(<Hero />)
    expect(screen.getByText(siteConfig.tagline)).toBeInTheDocument()
    expect(screen.queryByText(/Connecting Students, Professionals/)).not.toBeInTheDocument()
  })

  it('shows no template logo image', () => {
    const { container } = render(<Hero />)
    expect(container.querySelectorAll('img')).toHaveLength(0)
  })

  it('mounts under the #hero section landmark id', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('#hero')).not.toBeNull()
  })
})
