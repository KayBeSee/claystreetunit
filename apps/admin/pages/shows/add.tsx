import fetch from 'isomorphic-unfetch';

import { NewsProps, PageWidthWrapper } from 'components';
import AddNewsForm from 'components/AddNewsForm';
import { useRouter } from 'next/router';

const AddShowPage = () => {
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

AddShowPage.auth = true;

export default AddShowPage;
