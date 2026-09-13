export type Faq = { question: string; answer: string }

// Import CMS-managed FAQs
import faq1 from './faqs/what-is-the-organization-aiming-to-accomplish.json'
import faq2 from './faqs/are-you-really-a-charity.json'

export const faqs: Faq[] = [
  faq1,
  faq2,
  {
    question: "What are the organization's key strategies for making this happen?",
    answer: `Oak Grove Community Closet operates through volunteer engagement and community donations to provide free clothing and shoes throughout the Northern Neck region.`,
  },
  {
    question: "What are the organization's capabilities for doing this?",
    answer: `Our volunteer team collects, sorts, and distributes clothing and shoes to individuals and families in need across Colonial Beach, VA and surrounding communities.`,
  },
  {
    question: "What have and haven't they accomplished so far?",
    answer: `We have established a strong local presence in Colonial Beach, VA, providing essential clothing and shoes to community members completely free of charge.`,
  },
  {
    question: 'Is there a need for a charity to provide help for charities?',
    answer: `Yes, community closets play a critical role in providing basic necessities like clothing and shoes directly to individuals and families without financial barrier.`,
  },
  {
    question: 'Where did the idea come from?',
    answer: `Oak Grove Community Closet was founded to meet the direct need for clean, quality clothing and footwear for residents in Colonial Beach, VA and the Northern Neck.`,
  },
  {
    question: 'Why do charities pay for items they can get for free?',
    answer: `Our organization relies entirely on volunteer labor and community support to maximize the impact of every donation received.`,
  },
  {
    question: 'Where does Oak Grove Community Closet come in to help our charity or nonprofit?',
    answer: `Oak Grove Community Closet serves the Northern Neck region by ensuring that anyone in need of clothing or footwear has access to free, dignified choices.`,
  },
  {
    question: 'How can I tell if we have high overhead? / My charity does not have high overhead!',
    answer: `Oak Grove Community Closet is volunteer-led and donation-based, ensuring administrative overhead remains as low as possible so donations directly support community outreach.`,
  },
  {
    question: 'How do you provide your program services?',
    answer: `Services are provided directly through our physical community closet in Colonial Beach, VA, where items are organized and offered free of charge.`,
  },
  {
    question: 'Are you like Idealist.org or other matching agencies?',
    answer: `We are a direct-service community outreach organization providing essential physical items (clothing and shoes) to individuals and families.`,
  },
  {
    question: 'What do I need to get started?',
    answer: `To volunteer, donate, or receive assistance, please connect with us via our Facebook page or contact our team directly.`,
  },
  {
    question: 'How can you afford to give away free domain names?',
    answer: `As a 501(c)(3) charity, we seek individual and community contributions to support our outreach programs.`,
  },
  {
    question: 'Where do you get your domain name packages?',
    answer: `Our website is supported by FFC as part of their nonprofit technology platform program.`,
  },
  {
    question: 'Why do I not see hosting as an option?',
    answer: `Website hosting and technical infrastructure for Oak Grove Community Closet are provided through FFC's nonprofit platform support.`,
  },
  {
    question:
      'If I am an individual or business and donate money for a domain package to Oak Grove Community Closet is this tax-deductible?',
    answer: `Oak Grove Community Closet is a registered 501(c)(3) organization and donations are tax-deductible to the extent allowed by law. Our IRS designation number (EIN) is 54-0846335.`,
  },
]
