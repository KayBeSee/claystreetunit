import fetch from 'isomorphic-unfetch';

import { config } from 'data';

import { NewsProps, PageWidthWrapper } from 'components';
import AddNewsForm from 'components/AddNewsForm';
import { useRouter } from 'next/router';

const AddNewsPage = () => {
  const router = useRouter();

  const savePost = async (post: NewsProps) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/news`,
        {
          method: 'post',
          body: JSON.stringify(post),
        }
      );
      router.push('/news');
    } catch (e) {
      console.log('savePost e: ', e);
    }
  };

  return (
    <PageWidthWrapper>
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 pt-8 pb-24">
        <AddNewsForm
          config={config}
          onSave={savePost}
          post={{
            title: '',
            href: '',
            imageUrl: '',
            description: '',
            author: {
              name: '',
              imageUrl: '',
              href: '',
            },
          }}
        />
      </div>
    </PageWidthWrapper>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      config,
    },
  };
}

AddNewsPage.auth = true;
export default AddNewsPage;
