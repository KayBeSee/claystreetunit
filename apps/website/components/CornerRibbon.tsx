import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface Props {
  className?: string;
  link: string;
  children: React.ReactNode;
}

export const CornerRibbon = ({ link, className = '', children }: Props) => (
  <div className="fixed right-0 top-0 h-64 w-64 overflow-hidden pointer-events-none z-[1]">
    <Link
      href={link}
      className={clsx(
        'z-50 absolute transform rotate-45 bg-gray-600 text-serif text-center text-white font-semibold py-2 left-[-64px] top-[64px] w-[480px] pointer-events-auto',
        className
      )}
    >
      {children}
    </Link>
  </div>
);
