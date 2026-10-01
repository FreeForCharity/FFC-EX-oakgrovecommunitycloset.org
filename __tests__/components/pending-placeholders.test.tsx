import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Footer from '../../src/components/footer'
import Support from '../../src/components/home-page/SupportFreeForCharity'
import Volunteer from '../../src/components/home-page/Volunteer-with-Us'
import DonationPolicyPage from '../../src/app/donation-policy/page'
import { buildOrganizationSchema } from '../../src/components/seo/OrganizationSchema'
import { configuredTeam } from '../../src/data/team'
import {
  PENDING_TEXT,
  isPending,
  siteConfig,
  type PendingField,
  type SiteConfig,
} from '../../src/lib/site.config'

expect.extend(toHaveNoViolations)

// Ported from FreeForCharity/FFC-IN-FFC_Single_Page_Template#483 (the pending
// footer-field convention): a footer-standard field the charity has not
// supplied yet is listed in `siteConfig.pending`, keeps an EMPTY value, and
// renders PENDING_TEXT in its slot as plain text — never a link. Cases that
// need a different state set it themselves and restore the config afterwards.

const ORIGINAL: SiteConfig = JSON.parse(JSON.stringify(siteConfig))
function restore(): void {
  for (const key of Object.keys(siteConfig) as (keyof SiteConfig)[]) {
    if (!(key in ORIGINAL)) delete (siteConfig as Partial<SiteConfig>)[key]
  }
  Object.assign(siteConfig, JSON.parse(JSON.stringify(ORIGINAL)))
}

/** A fully-populated example config (nothing pending), for the "has a value" cases. */
function asCompleteSite(): void {
  Object.assign(siteConfig, {
    contactEmail: 'hello@example.org',
    phone: { display: '(555) 010-0101', tel: '15550100101' },
    ein: '12-3456789',
    guidestar: { profileUrl: '', directProfileUrl: '' },
    pending: [],
  } satisfies Partial<SiteConfig>)
}

const SEAL_ALT = 'GuideStar Platinum Seal of Transparency'
const DIRECT_LINK_TEXT = 'Direct GuideStar Profile Link'

/** Every placeholder rendered in `container`, each asserted to be plain text. */
function placeholders(container: HTMLElement): HTMLElement[] {
  const notes = within(container).queryAllByText(PENDING_TEXT)
  for (const note of notes) expect(note.closest('a')).toBeNull()
  return notes
}

describe('siteConfig.pending contract', () => {
  // Every PendingField mapped to "its value is empty". The Record type makes
  // this fail to compile if PendingField grows a member it does not cover.
  const isEmpty: Record<PendingField, () => boolean> = {
    email: () => siteConfig.contactEmail.trim() === '',
    phone: () => siteConfig.phone.display.trim() === '' && siteConfig.phone.tel.trim() === '',
    address: () => siteConfig.addresses.length === 0,
    ein: () => siteConfig.ein.trim() === '',
    guidestar: () =>
      siteConfig.guidestar.profileUrl.trim() === '' &&
      siteConfig.guidestar.directProfileUrl.trim() === '',
    social: () => siteConfig.social.every((s) => s.href.trim() === ''),
    team: () => configuredTeam.length === 0,
    donationUrl: () => siteConfig.integrations.zeffyDonationUrl.trim() === '',
    volunteerUrl: () => siteConfig.integrations.idealistUrl.trim() === '',
  }

  it('every listed field is known, listed once, and empty (the shipped config)', () => {
    const pending = siteConfig.pending ?? []
    const problems: string[] = []
    pending.forEach((field, index) => {
      if (!(field in isEmpty)) problems.push(`${field}: unknown field`)
      else if (pending.indexOf(field) !== index) problems.push(`${field}: listed twice`)
      else if (!isEmpty[field]()) problems.push(`${field}: pending but has a value`)
    })
    expect(problems).toEqual([])
    for (const field of pending) expect(isPending(field)).toBe(true)
  })

  it('has a fixed placeholder text', () => {
    expect(PENDING_TEXT).toBe('Awaiting information from the charity')
  })

  it('makes no 501(c)(3) claim while the EIN is pending', () => {
    if (isPending('ein')) expect(siteConfig.taxStatusLabel).toBe('')
  })
})

describe('pending footer fields', () => {
  afterEach(restore)

  it('renders one visible, non-link placeholder per pending footer field', () => {
    const { container } = render(<Footer />)
    const footerPending = (siteConfig.pending ?? []).filter((f) => f !== 'team')
    expect(placeholders(container)).toHaveLength(footerPending.length)
  })

  it('renders no placeholder when nothing is pending', () => {
    asCompleteSite()
    const { container } = render(<Footer />)
    expect(placeholders(container)).toHaveLength(0)
  })

  it('shows a non-dialable placeholder while the phone is pending', () => {
    asCompleteSite()
    Object.assign(siteConfig, { phone: { display: '', tel: '' }, pending: ['phone'] })
    const { container } = render(<Footer />)
    expect(screen.getByText('Call Us Today')).toBeInTheDocument()
    expect(placeholders(container)).toHaveLength(1)
    expect(container.querySelector('a[href^="tel:"]')).toBeNull()
  })

  it('omits the Call Us block for an empty phone that is NOT pending (no phone)', () => {
    asCompleteSite()
    Object.assign(siteConfig, { phone: { display: '', tel: '' } })
    render(<Footer />)
    expect(screen.queryByText('Call Us Today')).not.toBeInTheDocument()
  })

  it('shows no mailto: or map link while the email and address are pending', () => {
    asCompleteSite()
    Object.assign(siteConfig, { contactEmail: '', addresses: [], pending: ['email', 'address'] })
    const { container } = render(<Footer />)
    expect(placeholders(container)).toHaveLength(2)
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull()
    expect(container.querySelector('a[href*="maps.google.com"]')).toBeNull()
  })

  it('shows the EIN label with a placeholder, not an empty EIN, while the EIN is pending', () => {
    asCompleteSite()
    Object.assign(siteConfig, { ein: '', pending: ['ein'] })
    const { container } = render(<Footer />)
    expect(screen.getByText(`${siteConfig.name} EIN:`)).toBeInTheDocument()
    expect(placeholders(container)).toHaveLength(1)
  })

  it('drops the EIN line for an empty EIN that is NOT pending', () => {
    asCompleteSite()
    Object.assign(siteConfig, { ein: '' })
    render(<Footer />)
    expect(screen.queryByText(/ EIN:/)).not.toBeInTheDocument()
  })

  it('puts a Donate / Volunteer placeholder beside the quick link while pending', () => {
    render(<Footer />)
    for (const [name, field] of [
      ['Donate', 'donationUrl'],
      ['Volunteer', 'volunteerUrl'],
    ] as const) {
      const item = screen.getByText(name).closest('li') as HTMLElement
      if (isPending(field)) expect(within(item).getByText(PENDING_TEXT)).toBeInTheDocument()
      else expect(within(item).queryByText(PENDING_TEXT)).toBeNull()
    }
  })

  it('has no accessibility violations in the shipped (pending) state', async () => {
    const { container } = render(<Footer />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('GuideStar seal and direct link', () => {
  afterEach(restore)

  const PROFILE = 'https://www.guidestar.org/profile/12-3456789'
  const DIRECT = 'https://www.guidestar.org/profile/shared/example'

  it('shows both when both URLs are configured', () => {
    asCompleteSite()
    siteConfig.guidestar = { profileUrl: PROFILE, directProfileUrl: DIRECT }
    render(<Footer />)
    expect(screen.getByAltText(SEAL_ALT).closest('a')).toHaveAttribute('href', PROFILE)
    expect(screen.getByText(DIRECT_LINK_TEXT).closest('a')).toHaveAttribute('href', DIRECT)
  })

  it('hides both, with no placeholder, when the charity has no profile (not pending)', () => {
    asCompleteSite()
    const { container } = render(<Footer />)
    expect(screen.queryByAltText(SEAL_ALT)).not.toBeInTheDocument()
    expect(screen.queryByText(DIRECT_LINK_TEXT)).not.toBeInTheDocument()
    expect(screen.queryByText('GuideStar / Candid Profile')).not.toBeInTheDocument()
    expect(container.innerHTML).not.toContain('guidestar.org')
  })

  it('shows only the placeholder while GuideStar is pending', () => {
    asCompleteSite()
    siteConfig.pending = ['guidestar']
    const { container } = render(<Footer />)
    expect(screen.queryByAltText(SEAL_ALT)).not.toBeInTheDocument()
    expect(screen.queryByText(DIRECT_LINK_TEXT)).not.toBeInTheDocument()
    expect(screen.getByText('GuideStar / Candid Profile')).toBeInTheDocument()
    expect(placeholders(container)).toHaveLength(1)
  })
})

describe('pending donation and volunteer pages', () => {
  afterEach(restore)

  it('the Donate section shows a placeholder, not an empty embed, while pending', () => {
    siteConfig.integrations.zeffyDonationUrl = ''
    siteConfig.pending = ['donationUrl']
    const { container } = render(<Support />)
    expect(placeholders(container)).toHaveLength(1)
    expect(container.querySelector('iframe')).toBeNull()
  })

  it('the Volunteer section shows a placeholder, not a dead link, while pending', () => {
    siteConfig.integrations.idealistUrl = ''
    siteConfig.pending = ['volunteerUrl']
    const { container } = render(<Volunteer />)
    expect(placeholders(container)).toHaveLength(1)
    expect(container.querySelector('a')).toBeNull()
  })

  it('shows no placeholder for a configured donation or volunteer URL', () => {
    siteConfig.integrations.zeffyDonationUrl = 'https://www.zeffy.com/en-US/embed/donation-form/x'
    siteConfig.integrations.idealistUrl = 'https://www.idealist.org/en/nonprofit/x'
    siteConfig.pending = []
    expect(placeholders(render(<Support />).container)).toHaveLength(0)
    const volunteer = render(<Volunteer />)
    expect(placeholders(volunteer.container)).toHaveLength(0)
    expect(volunteer.container.querySelector('a')).toHaveAttribute(
      'href',
      'https://www.idealist.org/en/nonprofit/x'
    )
  })
})

describe('pending fields never reach structured data', () => {
  afterEach(restore)

  it('omits email, taxID and telephone while they are pending (the shipped state)', () => {
    const schema = buildOrganizationSchema()
    if (isPending('email')) expect(schema.email).toBeUndefined()
    if (isPending('ein')) expect(schema.taxID).toBeUndefined()
    if (isPending('phone')) expect(schema.telephone).toBeUndefined()
    expect(JSON.stringify(schema)).not.toContain(PENDING_TEXT)
  })

  it('omits a half-set phone and a malformed EIN', () => {
    asCompleteSite()
    Object.assign(siteConfig, { ein: 'PENDING', phone: { display: '', tel: '15550100101' } })
    const schema = buildOrganizationSchema()
    expect(schema.taxID).toBeUndefined()
    expect(schema.telephone).toBeUndefined()
  })

  it('still emits configured values', () => {
    asCompleteSite()
    const schema = buildOrganizationSchema()
    expect(schema.email).toBe('hello@example.org')
    expect(schema.taxID).toBe('12-3456789')
    expect(schema.telephone).toBe('15550100101')
  })
})

describe('donation policy EIN clause', () => {
  afterEach(restore)

  it('shows the placeholder while the EIN is pending', () => {
    siteConfig.ein = ''
    siteConfig.pending = ['ein']
    const { container } = render(<DonationPolicyPage />)
    expect(container.textContent).toContain(`(EIN: ${PENDING_TEXT})`)
  })

  it('names the EIN when one is configured', () => {
    asCompleteSite()
    const { container } = render(<DonationPolicyPage />)
    expect(container.textContent).toContain('(EIN: 12-3456789)')
  })

  it('prints no empty "(EIN: )" when the organization has none', () => {
    asCompleteSite()
    siteConfig.ein = ''
    const { container } = render(<DonationPolicyPage />)
    expect(container.textContent).not.toContain('EIN:')
  })

  it('calls donations tax-deductible only with a tax-status label', () => {
    asCompleteSite()
    siteConfig.taxStatusLabel = ''
    const { container } = render(<DonationPolicyPage />)
    expect(container.textContent).not.toContain('Donations are tax-deductible')
  })
})
