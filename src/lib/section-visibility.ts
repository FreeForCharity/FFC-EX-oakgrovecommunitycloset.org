import { isPending } from '@/lib/site.config'
import { configuredTeam } from '@/data/team'
import { faqs } from '@/data/faqs'

/**
 * The FAQ section, its #faq nav links and the FAQPage schema: shown only when
 * the charity has FAQ entries of its own (src/data/faqs.ts).
 */
export function faqSectionVisible(): boolean {
  return faqs.length > 0
}

/**
 * The Team section and its #team nav links: shown when at least one member has
 * a populated name, or while the team is pending (the section then renders the
 * "awaiting information" placeholder instead of cards — see `PendingField`).
 */
export function teamSectionVisible(): boolean {
  return configuredTeam.length > 0 || isPending('team')
}
