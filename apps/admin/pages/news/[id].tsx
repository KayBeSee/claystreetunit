import fetch from 'isomorphic-unfetch';

import { data } from '@ontour/data';
import { LoadingSpinner } from '@ontour/components';
import { PageWidthWrapper } from 'components';
import EditNewsForm from 'components/EditNewsForm';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { DataConfig } from '@ontour/types';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

interface Props {
  config: DataConfig;
}

const EditNewsPage = ({ config }: Props) => {
  const { query } = useRouter();
  const { data, error } = useSWR(`/api/news/${query.id}`, fetcher);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        Oops, something went wrong
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageWidthWrapper>
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 pt-8 pb-24">
        <EditNewsForm post={data} config={config} />
      </div>
    </PageWidthWrapper>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export async function getStaticProps(context) {
  return {
    props: {
      config: data,
    },
  };
}

EditNewsPage.auth = true;

export default EditNewsPage;
