import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ImageEditor } from 'components';

const backgrounds = ['/media-1.jpg', '/media-2.jpeg', '/media-3.png'];

const Media = () => {
  const [currentBackground, setCurrentBackground] = useState(backgrounds[0]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-start-1 lg:col-span-2 bg-white shadow sm:rounded-lg sm:px-1">
          <ImageEditor backgroundImage={currentBackground} />
        </div>
        <div className="lg:col-start-3 lg:col-span-1 bg-white shadow rounded-lg px-3 py-5">
          <h3 className="text-lg font-medium">Background image</h3>
          {backgrounds.map((item) => (
            <button
              onClick={() => setCurrentBackground(item)}
              className="h-24 w-24 relative"
            >
              <Image src={item} layout="fill" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

Media.auth = true;
export default Media;
