import React from 'react';

interface Props {
  header: String;
  subtext: String;
  children: React.ReactElement;
}

export const FormSection = ({ header, subtext, children }: Props) => {
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {header}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{subtext}</p>
        </div>
      </div>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
