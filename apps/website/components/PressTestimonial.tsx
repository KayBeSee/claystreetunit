import React from 'react';

import { TestimonialConfig } from 'types';

interface Props {
  testimonials: TestimonialConfig[];
}

export const PressTestimonial = ({ testimonials }: Props) => {
  return (
    <ul role="list" className="not-prose mt-10 space-y-4 pl-4 font-sans">
      {testimonials.map((item) => (
        <figure className="rounded-2xl py-1 px-4">
          <blockquote className="py-1">
            <p className="text-lg tracking-tight text-slate-600 font-normal before:content-['“'] after:content-['”']">
              {item.quote}
            </p>
          </blockquote>
          <figcaption className="flex items-center border-t border-slate-100">
            <div className="py-2">
              <div className="text-base font-semibold font-serif leading-6 tracking-tight text-sicard-blue-600">
                - {item.author}
              </div>
            </div>
          </figcaption>
        </figure>
      ))}
    </ul>
  );
};
