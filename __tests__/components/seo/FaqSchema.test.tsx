import React from 'react'
import { render } from '@testing-library/react'
import FaqSchema, { buildFaqSchema } from '../../../src/components/seo/FaqSchema'

const fixture = [
  { question: 'Example question one?', answer: 'Example answer one.' },
  { question: 'Example question two?', answer: 'Example answer two.' },
]

function withFixture<T>(fn: (mod: typeof import('../../../src/components/seo/FaqSchema')) => T): T {
  let out: T | undefined
  jest.isolateModules(() => {
    jest.doMock('@/data/faqs', () => ({ faqs: fixture }))
    out = fn(require('../../../src/components/seo/FaqSchema'))
  })
  return out as T
}

describe('FaqSchema', () => {
  it('emits nothing while the site has no FAQ entries (the shipped state)', () => {
    const { container } = render(<FaqSchema />)
    expect(container.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(0)
    expect((buildFaqSchema().mainEntity as unknown[]).length).toBe(0)
  })

  it('builds a schema.org FAQPage object from the faqs data', () => {
    const schema = withFixture((m) => m.buildFaqSchema())
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('FAQPage')
    const mainEntity = schema.mainEntity as Array<Record<string, unknown>>
    expect(mainEntity.length).toBe(fixture.length)
  })

  it('maps each FAQ to a Question with an acceptedAnswer', () => {
    const schema = withFixture((m) => m.buildFaqSchema())
    const mainEntity = schema.mainEntity as Array<Record<string, unknown>>
    mainEntity.forEach((entry, i) => {
      expect(entry['@type']).toBe('Question')
      expect(entry.name).toBe(fixture[i].question)
      const answer = entry.acceptedAnswer as Record<string, unknown>
      expect(answer['@type']).toBe('Answer')
      expect(answer.text).toBe(fixture[i].answer)
    })
  })

  it('renders a single application/ld+json script block whose JSON parses', () => {
    const { container } = withFixture((m) => render(<m.default />))
    const scripts = container.querySelectorAll('script[type="application/ld+json"]')
    expect(scripts.length).toBe(1)
    const parsed = JSON.parse(scripts[0].textContent ?? '') as Record<string, unknown>
    expect(parsed['@type']).toBe('FAQPage')
    expect((parsed.mainEntity as unknown[]).length).toBe(fixture.length)
  })
})
