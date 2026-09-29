/**
 * Test Configuration for Template Customization
 *
 * This file contains all content-specific values used in E2E tests.
 * When customizing this template for a new organization, update these
 * values to match your content instead of modifying individual test files.
 *
 * This makes it easy to:
 * 1. Identify what needs to change when using the template
 * 2. Keep tests working with customized content
 * 3. Maintain a single source of truth for test expectations
 */

import { analyticsConfig } from '../src/lib/analytics.config'
import { siteConfig } from '../src/lib/site.config'
import { results } from '../src/data/results'

export const testConfig = {
  /**
   * Application Form Configuration
   * Used in: tests/application-form.spec.ts
   */
  applicationForm: {
    buttonText: 'Apply to Become a Supported Charity',
    modalTitle: 'Charity Application Form',
    loadingText: 'Loading application form...',
    closeButtonAriaLabel: 'Close application form',
  },

  /**
   * Events Section Configuration
   * Used in: tests/events.spec.ts
   */
  events: {
    sectionId: 'events',
    heading: 'Upcoming Events',
    footerLinkText: 'Events',
    facebookLinkText: 'View all events on Facebook',
    // Sourced from siteConfig so the expected link always matches what the
    // Events component renders (single source of truth).
    facebookUrl: siteConfig.integrations.eventsFacebookPageUrl,
    descriptionText: 'volunteer opportunities',
    emptyStateHeading: 'No upcoming events right now',
    emptyStateButton: 'Follow us on Facebook',
  },

  /**
   * Social Media Links Configuration
   * Used in: tests/social-links.spec.ts
   */
  socialLinks: {
    // This charity's own links, sourced from siteConfig (the template's were
    // Free For Charity's). Each renders as a footer icon labelled by `label`.
    links: siteConfig.social.filter((s) => s.href.trim()),
  },

  /**
   * Copyright Configuration
   * Used in: tests/copyright.spec.ts
   */
  copyright: {
    text: `All Rights Are Reserved by ${siteConfig.name}${
      siteConfig.taxStatusLabel.trim() ? ` ${siteConfig.taxStatusLabel.trim()}` : ''
    }`,
    searchText: 'All Rights Are Reserved',
    // The permanent "Supported by" attribution (FFC footer standard) — sourced
    // from siteConfig.supportedBy, which is required and always rendered.
    supportedByUrl: siteConfig.supportedBy.url,
    supportedByText: siteConfig.supportedBy.name,
    // Sourced from siteConfig so the parent-org link expectations track the
    // footer (which now shows the org name, not the raw URL, as link text).
    linkUrl: siteConfig.parentOrg?.url ?? '',
    linkText: siteConfig.parentOrg?.name ?? siteConfig.name,
  },

  /**
   * Animated Numbers Configuration
   * Used in: tests/animated-numbers.spec.ts
   */
  animatedNumbers: {
    // Sourced from src/data/results.ts. This charity ships no results yet (the
    // template's were Free For Charity's own), so those specs skip while it
    // is empty and the section self-hides.
    sectionHeading: results.heading,
    statistics: results.stats.map((s) => ({ description: s.label, value: s.value })),
  },

  /**
   * Google Tag Manager Configuration
   * Used in: tests/google-tag-manager.spec.ts
   *
   * Sourced from the same src/lib/analytics.config.ts the component reads, so
   * the expected ID always matches what the build embedded.
   */
  googleTagManager: {
    id: analyticsConfig.gtmId,
  },

  /**
   * Header branding
   * Used in: tests/logo.spec.ts. The site has no charity logo yet, so the
   * header shows the charity name as text (never Free For Charity's logo).
   */
  logo: {
    headerText: siteConfig.name,
  },

  /**
   * Cookie Consent Configuration
   * Used in: tests/cookie-consent.spec.ts
   */
  cookieConsent: {
    bannerHeading: 'We Value Your Privacy',
    modalHeading: 'Cookie Preferences',
    buttons: {
      acceptAll: 'Accept All',
      declineAll: 'Decline All',
      customize: 'Customize',
      savePreferences: 'Save Preferences',
      cancel: 'Cancel',
    },
  },
}
