import { Prose } from 'components/layout';
import { Contact, Copyright, PressTestimonial } from 'components';
import { Title, Description } from 'utils/Meta';
import { DataConfig } from '@ontour/types';

interface Props {
  children: any;
  config: DataConfig;
}

export function AboutLayout({ children, config }: Props) {
  return (
    <>
      <Title>Info</Title>
      <Description>{`Artist information about ${config.artistName} including bio, booking contacts, management contacts, and social media.`}</Description>
      <div
        className="bg-fixed bg-no-repeat bg-cover bg-center h-screen w-screen relative pt-16 pb-20 px-0 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 overflow-y-scroll"
        style={{ backgroundImage: `url(${config.info.style.backgroundImage})` }}
      >
        <div className="flex flex-col rounded-lg shadow-lg bg-white max-w-4xl mx-auto overflow-hidden pt-16 pb-12 px-0 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto px-8">
            <Prose className="prose-h1:text-center prose-p:text-gray-500 prose-p: prose-h4:text-xl prose-h4:leading-8 prose-h4:mb-8 prose-h4:-mx-2 prose-h4:font-normal prose-h4:text-gray-500 prose-h3:text-blue-600 prose-h3:text-center prose-h3:tracking-wide prose-h3:uppercase prose-h3:text-base prose-h3:font-semibold prose-a:text-sicard-blue-700 prose-a:no-underline hover:prose-a:border-b hover:prose-a:border-sicard-blue-600 hover:prose-a:text-sicard-blue-600">
              {children}
            </Prose>
            {config.info.testimonials.length ? (
              <PressTestimonial testimonials={config.info.testimonials} />
            ) : null}
            <Contact
              contacts={config.info.contacts}
              socialLinks={config.info.social}
            />
            <Copyright
              legalEntity={config.legalEntity}
              textColor="text-slate-600"
            />
          </div>
        </div>
      </div>
    </>
  );
}
