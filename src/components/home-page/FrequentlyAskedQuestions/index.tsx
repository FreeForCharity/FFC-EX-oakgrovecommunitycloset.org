import React from 'react'
import FrequentlyAskedQuestions from '@/components/ui/Frequently-Asked-Questions'
import { faqs } from '@/data/faqs'
import { faqSectionVisible } from '@/lib/section-visibility'

const index = () => {
  // Self-hide until the charity supplies FAQ entries of its own.
  if (!faqSectionVisible()) return null
  return (
    <div id="faq" className="py-[50px]">
      <div className="w-[90%] mx-auto lg:px-[20px]">
        <h2 className="font-[400] text-[40px] lg:text-[48px]  tracking-[0] text-center mx-auto mb-[50px] faustina-font">
          Frequently Asked Questions
        </h2>
        <div>
          {faqs.map((faq, idx) => (
            <FrequentlyAskedQuestions key={idx} title={faq.question}>
              <p className="mb-[30px]">{faq.answer}</p>
            </FrequentlyAskedQuestions>
          ))}
        </div>
      </div>
    </div>
  )
}

export default index
