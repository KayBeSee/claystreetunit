import { useRouter } from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Tabs = () => {
  const router = useRouter();
  const { pathname, query } = router;

  const tabs = [
    {
      name: 'Info',
      href: `/shows/${query.id}`,
      current: pathname === '/shows/[id]',
    },
    {
      name: 'Day of Show',
      href: `/shows/${query.id}/day-of-show`,
      current: pathname.includes('day-of-show'),
    },
    {
      name: 'Venue',
      href: `/shows/${query.id}/venue`,
      current: pathname.includes('venue'),
    },
    {
      name: 'Promotor',
      href: `/shows/${query.id}/promotor`,
      current: pathname.includes('promotor'),
    },
    {
      name: 'Agreement',
      href: `/shows/${query.id}/agreement`,
      current: pathname.includes('agreement'),
    },
    {
      name: 'Accomidations',
      href: `/shows/${query.id}/#`,
      current: pathname.includes('accomidations'),
    },
    {
      name: 'Marketing',
      href: `/shows/${query.id}/marketing`,
      current: pathname.includes('marketing'),
    },
    {
      name: 'Media',
      href: `/shows/${query.id}/media`,
      current: pathname.includes('media'),
    },
    {
      name: 'Setlist',
      href: `/shows/${query.id}/setlist`,
      current: pathname.includes('setlist'),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sicard-blue-500 focus:border-sicard-blue-500 sm:text-sm rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? 'border-sicard-blue-500 text-sicard-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                )}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
