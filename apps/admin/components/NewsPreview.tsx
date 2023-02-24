export interface NewsProps {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  author: {
    name: string;
    imageUrl: string;
    href: string;
  };
  datetime: number;
}

interface Props {
  post: NewsProps;
}

const getDate = (date) => {
  const dateObj = new Date(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'numeric' }).format(
    dateObj
  );
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(
    dateObj
  );
  const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(
    dateObj
  );

  return `${month}/${day}/${year}`;
};

export const NewsPreview = ({ post }: Props) => {
  return (
    <div>
      <h3 className="text-lg">Preview:</h3>

      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none bg-white/90 rounded-lg shadow-lg py-8 px-4">
        <a
          href={post.href}
          key={post.title}
          className="flex flex-col rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] duration-300 overflow-hidden"
        >
          <div className="flex-shrink-0">
            {!!post.imageUrl ? (
              <img
                className="h-48 w-full object-cover"
                src={post.imageUrl}
                alt=""
              />
            ) : (
              <div className="bg-gray-100 h-40 flex items-center justify-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <div className="block mt-2">
                <p className="text-xl font-semibold text-gray-900">
                  {post.title || 'Add a title'}
                </p>
                <p className="mt-3 text-base text-gray-500">
                  {post.description || 'Add a description'}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <a href={post.author.href}>
                  <span className="sr-only">
                    {post.author.name || 'Add an author'}
                  </span>
                  {!!post.author.imageUrl ? (
                    <img
                      className="h-10 w-10 rounded-full bg-black"
                      src={post.author.imageUrl}
                      alt=""
                    />
                  ) : (
                    <svg
                      className="mx-auto text-white h-10 w-10 rounded-full bg-sicard-blue-700 p-2"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  )}
                </a>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  <div>{post.author.name || 'Add an author'}</div>
                </p>
                <div className="flex space-x-1 text-sm text-gray-500">
                  <time dateTime={getDate(post.datetime)}>
                    {getDate(post.datetime)}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
