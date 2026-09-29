export type Faq = { question: string; answer: string }

// The template's FAQ is FFC's own (domain names, hosting, "a
// charity for charities", FFC's EIN), so none of it ships here. Add the
// charity's own questions and answers when it supplies them; the FAQ section,
// its nav links and the FAQPage schema all self-hide while this list is empty.
export const faqs: Faq[] = []
