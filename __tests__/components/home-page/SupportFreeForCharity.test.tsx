import React from 'react'
import { render, screen } from '@testing-library/react'
import Support from '../../../src/components/home-page/SupportFreeForCharity'
import { siteConfig } from '../../../src/lib/site.config'

describe('SupportFreeForCharity', () => {
  it('renders the section heading', () => {
    render(<Support />)
    expect(screen.getByRole('heading', { name: `Support ${siteConfig.name}` })).toBeInTheDocument()
  })

  it('mounts under the #donate section landmark id', () => {
    const { container } = render(<Support />)
    expect(container.querySelector('#donate')).not.toBeNull()
  })
})
