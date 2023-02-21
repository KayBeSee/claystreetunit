import React from 'react';

interface Props {
  className?: string;
}

export const YoutubeMusic = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3443 500"
      className={className}
    >
      <path d="M2523 193.9c-12.8 64.9-22.5 144-27.6 176.7h-3.6c-4.1-33.7-13.8-112.4-27.1-176.2L2432 35.6h-99.6v428.5h61.8V110.9l6.1 33 62.8 320.2h61.8l61.8-320.2 6.6-33.2v353.4h61.8V35.6h-100.6L2523 193.9zm299.3 205.8c-5.6 11.7-17.9 19.9-30.1 19.9-14.3 0-19.9-11.2-19.9-38.8V151h-70.5v233.9c0 57.7 18.9 84.3 60.8 84.3 28.6 0 51.6-12.8 67.4-43.4h1.5l6.1 38.3h55.2V151h-70.5v248.7zm206.8-125.1c-23-16.9-37.3-28.1-37.3-52.6 0-17.4 8.2-27.1 27.6-27.1 19.9 0 26.6 13.8 27.1 60.8l59.2-2.6c4.6-76.1-20.4-107.8-85.3-107.8-60.3 0-89.9 27.1-89.9 82.7 0 50.6 24.5 73.5 64.4 103.7 34.2 26.6 54.1 41.4 54.1 62.8 0 16.3-10.2 27.6-28.1 27.6-20.9 0-33.2-19.9-30.1-54.6l-59.8 1c-9.2 64.9 16.9 102.7 86.3 102.7 60.8 0 92.4-28.1 92.4-84.3.1-51-25.4-71.5-80.6-112.3zM3148.6 151h67.4v313.1h-67.4zm34.2-123.6c-26 0-38.3 9.7-38.3 43.4 0 34.7 12.3 43.4 38.3 43.4 26.6 0 38.3-8.7 38.3-43.4 0-32.2-11.7-43.4-38.3-43.4zm260 323.8-61.8-3.1c0 55.2-6.1 73-27.1 73-20.9 0-24.5-19.9-24.5-84.8v-60.8c0-62.8 4.1-82.7 25-82.7 19.4 0 24.5 18.9 24.5 77.1l61.3-4.1c4.1-48.5-2-81.7-20.9-100.6-13.8-13.8-34.7-20.4-63.8-20.4-68.4 0-96.5 36.8-96.5 139.9v43.9c0 106.2 24 140.4 94 140.4 29.6 0 50-6.1 63.8-19.4 19.9-18.2 27.5-49.9 26-98.4zM1036.8 454.9c-14.1-9.5-24.2-24.3-30.1-44.4-6-20.1-8.9-46.8-8.9-80.2v-45.5c0-33.7 3.4-60.8 10.2-81.2 6.8-20.4 17.4-35.3 31.9-44.7 14.5-9.4 33.5-14 57-14 23.2 0 41.7 4.8 55.7 14.3s24.2 24.4 30.6 44.7c6.5 20.3 9.7 47.2 9.7 81v45.5c0 33.4-3.2 60.2-9.5 80.5-6.3 20.3-16.5 35.1-30.6 44.4-14.1 9.4-33.3 14-57.5 14-24.9-.1-44.4-4.9-58.5-14.4zm79.2-49c3.9-10.2 5.9-26.9 5.9-50.1v-97.6c0-22.5-2-38.9-5.9-49.3-3.9-10.4-10.8-15.6-20.7-15.6-9.5 0-16.3 5.2-20.2 15.6-3.9 10.4-5.9 26.8-5.9 49.3v97.6c0 23.2 1.9 39.8 5.6 50.1 3.7 10.2 10.5 15.3 20.4 15.3 9.9 0 16.8-5.1 20.8-15.3zM2121.7 331v15.8c0 20.1.6 35.2 1.8 45.2 1.2 10 3.7 17.4 7.4 22 3.7 4.6 9.5 6.9 17.4 6.9 10.5 0 17.8-4.1 21.7-12.3 3.9-8.2 6-21.8 6.4-40.9l60.8 3.6c.3 2.7.5 6.5.5 11.2 0 28.9-7.9 50.6-23.8 64.9-15.8 14.3-38.2 21.5-67.2 21.5-34.7 0-59.1-10.9-73-32.7-14-21.8-20.9-55.5-20.9-101.1v-54.7c0-47 7.2-81.3 21.7-102.9 14.5-21.6 39.2-32.4 74.3-32.4 24.2 0 42.7 4.4 55.7 13.3 12.9 8.9 22 22.6 27.3 41.4 5.3 18.7 7.9 44.6 7.9 77.6V331h-118zm8.9-131.8c-3.6 4.4-6 11.7-7.1 21.7-1.2 10-1.8 25.3-1.8 45.7v22.5h51.6v-22.5c0-20.1-.7-35.3-2-45.7-1.4-10.4-3.8-17.7-7.4-22-3.6-4.3-9.1-6.4-16.6-6.4-7.6.1-13.1 2.3-16.7 6.7zM865.1 325.1 784.9 35.5h70L883 166.8c7.2 32.4 12.4 59.9 15.8 82.7h2c2.4-16.3 7.7-43.8 15.8-82.2l29.1-131.8h70l-81.2 289.6V464H865V325.1zM1420.4 151v313.1h-55.2l-6.1-38.3h-1.5c-15 28.9-37.5 43.4-67.4 43.4-20.8 0-36.1-6.8-46-20.4-9.9-13.6-14.8-34.9-14.8-63.9V151h70.5v229.9c0 14 1.5 23.9 4.6 29.9 3.1 6 8.2 8.9 15.3 8.9 6.1 0 12-1.9 17.6-5.6 5.6-3.7 9.8-8.5 12.5-14.3V151h70.5zm361.6 0v313.1h-55.2l-6.1-38.3h-1.5c-15 28.9-37.5 43.4-67.4 43.4-20.8 0-36.1-6.8-46-20.4-9.9-13.6-14.8-34.9-14.8-63.9V151h70.5v229.9c0 14 1.5 23.9 4.6 29.9 3.1 6 8.2 8.9 15.3 8.9 6.1 0 12-1.9 17.6-5.6 5.6-3.7 9.8-8.5 12.5-14.3V151h70.5z" />
      <path d="M1612 92.2h-70v371.9h-69V92.2h-70V35.5h209v56.7zM2015.3 201c-4.3-19.7-11.2-34-20.7-42.9-9.5-8.9-22.7-13.3-39.3-13.3-12.9 0-25 3.7-36.3 11-11.2 7.3-19.9 16.9-26.1 28.9h-.5v-165h-67.9v444.4h58.2l7.2-29.6h1.5c5.4 10.6 13.6 18.9 24.5 25 10.9 6.1 23 9.2 36.3 9.2 23.8 0 41.4-11 52.6-32.9 11.2-22 16.9-56.3 16.9-102.9v-49.5c0-35.2-2.1-62.6-6.4-82.4zm-64.6 127.7c0 22.8-.9 40.7-2.8 53.6-1.9 12.9-5 22.1-9.5 27.6-4.4 5.5-10.4 8.2-17.9 8.2-5.8 0-11.2-1.4-16.1-4.1-4.9-2.7-8.9-6.8-12-12.3V224c2.4-8.5 6.5-15.5 12.3-20.9 5.8-5.4 12.1-8.2 18.9-8.2 7.2 0 12.7 2.8 16.6 8.4 3.9 5.6 6.6 15.1 8.2 28.4 1.5 13.3 2.3 32.2 2.3 56.7v40.3zM699.4 78.1c-8.2-30.7-32.4-54.9-63.2-63.2C580.5 0 357.1 0 357.1 0s-223.3 0-279 14.9c-30.7 8.2-54.9 32.4-63.2 63.2C0 133.8 0 250 0 250s0 116.2 14.9 171.9c8.2 30.7 32.4 54.9 63.2 63.2 55.7 14.9 279 14.9 279 14.9s223.4 0 279.1-14.9c30.7-8.2 54.9-32.4 63.2-63.2 14.9-55.7 14.9-171.9 14.9-171.9s0-116.2-14.9-171.9z" />
      <path fill="#FFF" d="M285.7 357.1V142.9L471.3 250z" />
    </svg>
  );
};
