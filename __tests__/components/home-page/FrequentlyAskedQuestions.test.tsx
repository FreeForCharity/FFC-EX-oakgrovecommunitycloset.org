import React from 'react'
import { render, screen } from '@testing-library/react'
import FAQ from '../../../src/components/home-page/FrequentlyAskedQuestions'
import { faqs } from '../../../src/data/faqs'

const fixture = [{ question: 'Example question?', answer: 'Example answer.' }]

function renderWithFixture() {
  faqs.push(...fixture)
  try {
    return render(<FAQ />)
  } finally {
    faqs.splice(faqs.length - fixture.length)
  }
}

describe('FrequentlyAskedQuestions', () => {
  // The template's FAQ was Free For Charity's own, so this charity ships none
  // until it supplies its own questions.
  it('self-hides while the charity has supplied no FAQ (the shipped state)', () => {
    const { container } = render(<FAQ />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the section heading', () => {
    renderWithFixture()
    expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeInTheDocument()
    expect(screen.getByText(fixture[0].question)).toBeInTheDocument()
  })

  it('mounts under the #faq section landmark id', () => {
    const { container } = renderWithFixture()
    expect(container.querySelector('#faq')).not.toBeNull()
  })
})
