import { useEffect, useState, useRef } from 'react';
import { XIcon } from '@heroicons/react/outline';

import { LoadingSpinner } from 'components';
import { DataConfig } from 'types';

const url = 'https://api.cloudinary.com/v1_1/dyxybmew8/image/upload';

interface Props {
  onImageUpload: (url: string) => void;
  onImageDelete: () => void;
  currentImageUrl: string;
  config: DataConfig;
}

export const ImageUploader = ({
  onImageUpload,
  onImageDelete,
  currentImageUrl,
  config,
}: Props) => {
  const drop = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    drop.current?.addEventListener('dragover', handleDragOver);
    drop.current?.addEventListener('drop', handleDrop);

    return () => {
      drop.current?.removeEventListener('dragover', handleDragOver);
      drop.current?.removeEventListener('drop', handleDrop);
    };
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    uploadFile(files);
  };

  const uploadFile = async (files: FileList) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'lmicqrpq');
    formData.append('folder', `${config.dbName}/news`);

    try {
      const resp = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const result = JSON.parse(await resp.text());
      onImageUpload(result.url);
    } catch (e) {}
    setIsLoading(false);
  };

  return (
    <div ref={drop}>
      <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {isLoading ? (
            <LoadingSpinner />
          ) : !!currentImageUrl ? (
            <div className="group relative">
              <button
                onClick={() => onImageDelete()}
                className="opacity-0 bg-red-500 p-2 rounded-full absolute top-0 right-0 -mt-2 -mr-2 group-hover:opacity-95"
              >
                <XIcon className="h-4 w-4 text-white" />
              </button>
              <img src={currentImageUrl} className="max-h-96" />
            </div>
          ) : (
            <>
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={(e) => uploadFile(e.target.files)}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
