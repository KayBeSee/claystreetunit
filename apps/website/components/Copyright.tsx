import clsx from 'clsx';

interface Props {
  textColor: string;
  legalEntity: string;
}

export const Copyright = ({ textColor, legalEntity }: Props) => {
  const year = new Date().getFullYear();
  return (
    <div className="text-center pt-16 pb-20 sm:pb-10 lg:pb-10">
      <p className="flex flex-col sm:flex-row w-full items-center justify-center">
        <span className={clsx('text-xs', textColor)}>
          Copyright © {year} {legalEntity}.
        </span>
        <span className={clsx('text-xs ml-0 sm:ml-1', textColor)}>
          All Rights Reserved.
        </span>
      </p>
      <p className={clsx('text-xs', textColor)}>
        Website by{' '}
        <a
          href="https://kevinmulcrone.com"
          target="_blank"
          className="hover:text-slate-500"
        >
          Kevin Mulcrone
        </a>
      </p>
    </div>
  );
};
