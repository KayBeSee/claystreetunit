import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  iconClassName: string;
  socialLinks: any;
}

export const SocialIcons = ({ iconClassName, socialLinks }: Props) => (
  <div className="flex justify-between sm:justify-start gap-x-6 sm:gap-x-8">
    {socialLinks.map((link) => (
      <a href={link.url} key={link.url} target="_blank" rel="noreferrer">
        <FontAwesomeIcon
          icon={link.icon}
          className={clsx(
            'h-6 w-6 relative hover:scale-110 transition duration-300 cursor-pointer',
            iconClassName
          )}
        />
      </a>
    ))}
  </div>
);
