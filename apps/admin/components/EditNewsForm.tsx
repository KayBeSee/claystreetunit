import { useState } from 'react';
import { useRouter } from 'next/router';

import { NewsPreview, NewsProps, ImageUploader } from 'components';
import { DataConfig } from 'types';

interface Props {
  post?: NewsProps;
  config: DataConfig;
}

const EditNewsForm = ({ post, config }: Props) => {
  const router = useRouter();

  const [title, setTitle] = useState(post.title);
  const [linkUrl, setLinkUrl] = useState(post.href);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [description, setDescription] = useState(post.description);

  const [authorName, setAuthorName] = useState(post.author.name);
  const [authorImageUrl, setAuthorImageUrl] = useState(post.author.imageUrl);

  const savePost = async (updatedPost: NewsProps) => {
    try {
      const response = await fetch(`/api/news/${post._id}`, {
        method: 'put',
        body: JSON.stringify(updatedPost),
      });
      router.push('/news');
    } catch (e) {
      console.log('savePost e: ', e);
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`/api/news/${post._id}`, {
        method: 'delete',
      });
      router.push('/news');
    } catch (e) {
      console.log('savePost e: ', e);
    }
  };

  return (
    <>
      <div className="space-y-8">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Add news link
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            This information will be displayed as a news article on{' '}
            <a href="#" className="underlined text-sicard-blue-200">
              {config.websiteUrl}/news
            </a>
            .
          </p>
        </div>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Link information
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sicard-blue-500 focus:border-sicard-blue-500 sm:text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Link Url
                </label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sicard-blue-500 focus:border-sicard-blue-500 sm:text-sm"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="shadow-sm py-2 px-3 focus:ring-sicard-blue-500 focus:border-sicard-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Some commentary for the article to help with SEO.
                </p>
              </div>
              <div className="col-span-3 md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Cover image
                </label>
                <div className="mt-2 sm:mt-2">
                  <ImageUploader
                    onImageUpload={setImageUrl}
                    currentImageUrl={imageUrl}
                    onImageDelete={() => setImageUrl('')}
                    config={config}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Author information
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sicard-blue-500 focus:border-sicard-blue-500 sm:text-sm"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
              </div>

              <div className="col-start-1 col-end-4 md:col-end-3 lg:col-end-2">
                <label className="block text-sm font-medium text-gray-700">
                  Author image
                </label>
                <div className="mt-2 sm:mt-2">
                  <ImageUploader
                    onImageUpload={setAuthorImageUrl}
                    currentImageUrl={authorImageUrl}
                    onImageDelete={() => setAuthorImageUrl('')}
                    config={config}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 text-right sm:px-6 space-x-2">
          <button
            onClick={() => deletePost()}
            className="py-2 px-4 rounded-md text-sm font-medium text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sicard-blue-500"
          >
            Delete
          </button>
          <button
            className="bg-sicard-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sicard-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sicard-blue-500"
            onClick={() =>
              savePost({
                title,
                description,
                imageUrl,
                href: linkUrl,
                author: {
                  name: authorName,
                  imageUrl: authorImageUrl,
                  href: '#',
                },
                datetime: Date.now(),
              })
            }
          >
            Update
          </button>
        </div>
      </div>

      <NewsPreview
        post={{
          title,
          description,
          imageUrl,
          href: linkUrl,
          author: {
            name: authorName,
            imageUrl: authorImageUrl,
            href: '#',
          },
          datetime: Date.now(),
        }}
      />
    </>
  );
};

export default EditNewsForm;
