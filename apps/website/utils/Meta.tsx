import Head from 'next/head';
import { data } from '@ontour/data';

interface TitleProps {
  children: string;
  suffix?: string;
}

export function Title({ suffix = data.artistName, children }: TitleProps) {
  let title = children + (suffix ? ` - ${suffix}` : '');

  return (
    <>
      <Head>
        <title key="title">{title}</title>
      </Head>
      <OgTitle suffix={suffix}>{children}</OgTitle>
    </>
  );
}

export function OgTitle({ suffix = data.artistName, children }: TitleProps) {
  let title = children + (suffix ? ` - ${suffix}` : '');

  return (
    <Head>
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="og:title" property="og:title" content={title} />
    </Head>
  );
}

interface DescriptionProps {
  children: string;
}

export function Description({ children }: DescriptionProps) {
  return (
    <>
      <Head>
        <meta name="description" content={children} />
      </Head>
      <OgDescription>{children}</OgDescription>
    </>
  );
}

export function OgDescription({ children }) {
  return (
    <Head>
      <meta key="og:description" property="og:description" content={children} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={children}
      />
    </Head>
  );
}
