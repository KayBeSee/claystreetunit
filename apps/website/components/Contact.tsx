import Image from 'next/image';

import { SocialIcons } from 'components';

import { Agency, SocialMediaItem } from '@ontour/types';

interface Props {
  contacts: Agency[];
  socialLinks: SocialMediaItem[];
}

export const Contact = ({ contacts, socialLinks }: Props) => (
  <section className="pt-16">
    <h2 className="font-serif text-xl tracking-tight text-slate-900 font-bold mb-10">
      Contact
    </h2>
    <ul className="grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2">
      {contacts.map(({ title, company, href, contacts, icon }) => (
        <li key={title} className="relative flex flex-row-reverse group">
          <div className="peer group flex-auto ml-6">
            <h3 className="font-semibold text-slate-900">
              <a
                href={href}
                className="before:absolute before:-inset-3 before:rounded-2xl sm:before:-inset-4"
              >
                {title}
                <svg
                  viewBox="0 0 3 6"
                  className="ml-3 w-auto h-1.5 overflow-visible inline -mt-px text-slate-400 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  <path
                    d="M0 0L3 3L0 6"
                    fill="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </h3>
            <p className="text-slate-600 text-sm">{company}</p>
            <div className="mt-3 grid text-sm leading-6 gap-y-4">
              {contacts.map((contact, i) => (
                <span key={i}>
                  <p key={contact.email} className="text-slate-900 font-medium">
                    {contact.name}
                  </p>
                  <p className="text-slate-600">{contact.email}</p>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center w-16 h-16 p-[0.1875rem] rounded-full shadow overflow-hidden pointer-events-none ring-1 ring-slate-900/10">
            <span className="relative w-12 h-12 grayscale group-hover:grayscale-0">
              <Image src={icon} layout="fill" />
            </span>
          </div>
          <div className="absolute -inset-3 rounded-2xl bg-slate-50 opacity-0 peer-hover:opacity-100 sm:-inset-4 -z-10" />
        </li>
      ))}
    </ul>
    <div className="mt-20">
      <SocialIcons socialLinks={socialLinks} iconClassName="text-slate-700" />
    </div>
  </section>
);
