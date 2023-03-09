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
      <Title>{config.info.og.title}</Title>
      <Description>{config.info.og.description}</Description>

      <div
        // @ts-ignore
        style={{ '--image-url': `url(${config.info.style.backgroundImage})` }}
        className="sm:hidden bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),var(--image-url)] sm:bg-[image:var(--image-url)] bg-no-repeat overflow-y-scroll bg-cover bg-center w-screen relative pt-20 pb-20 px-0 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8"
      >
        <h3 className="sm:hidden text-center text-blue-400 tracking-wide uppercase text-base font-semibold">
          Introducing
        </h3>
        <h2 className="sm:hidden text-center text-3xl tracking-tight font-extrabold text-white pt-2 pb-16 sm:text-4xl font-serif">
          {config.artistName}
        </h2>
      </div>

      <div
        className="bg-fixed bg-no-repeat bg-cover bg-center h-screen w-screen relative sm:pt-16 pb-20 px-0 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 sm:overflow-y-scroll"
        style={{ backgroundImage: `url(${config.info.style.backgroundImage})` }}
      >
        <div className="flex flex-col sm:rounded-lg shadow-lg bg-white max-w-4xl mx-auto overflow-hidden sm:pt-16 pb-12 px-0 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto px-8">
            <Prose className="prose-h1:hidden sm:prose-h1:block prose-h3:hidden sm:prose-h3:block prose-h1:text-center prose-p:text-gray-500 prose-p: prose-h4:text-xl prose-h4:leading-8 prose-h4:mb-8 prose-h4:-mx-2 prose-h4:font-normal prose-h4:text-gray-500 prose-h3:text-blue-600 prose-h3:text-center prose-h3:tracking-wide prose-h3:uppercase prose-h3:text-base prose-h3:font-semibold prose-a:text-sicard-blue-700 prose-a:no-underline hover:prose-a:border-b hover:prose-a:border-sicard-blue-600 hover:prose-a:text-sicard-blue-600">
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
