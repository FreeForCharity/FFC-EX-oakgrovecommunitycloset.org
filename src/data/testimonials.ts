// Testimonials data
// This file imports testimonial data from JSON files in ./testimonials/ directory
// To edit testimonials, edit the JSON files directly in src/data/testimonials/.
// Each testimonial needs a heading and text; name, location, and locationUrl
// are optional (location renders as a link when locationUrl is present).

export type Testimonial = {
  heading: string
  text: string
  name?: string
  location?: string
  locationUrl?: string
}

// The template's testimonials were written about FFC (the template's supporting org), not this
// charity, so none ship until the charity supplies its own (the section
// self-hides while this list is empty).
export const testimonials: Testimonial[] = []

// Mirrors `configuredTeam`: `testimonials` is a fixed list of JSON imports, so
// blanking the JSON files leaves its length unchanged. `configuredTestimonials`
// keeps only entries with the required `heading` and `text` populated, so the
// section self-hides when a fork clears them rather than rendering empty quotes.
export const configuredTestimonials: Testimonial[] = testimonials.filter(
  (t) =>
    typeof t.heading === 'string' &&
    t.heading.trim().length > 0 &&
    typeof t.text === 'string' &&
    t.text.trim().length > 0
)
