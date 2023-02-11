export const getImageUrlFromPublicId = (publicId: string) => {
  if (!publicId) {
    return '';
  }
  // TODO: make cloudinary bucket dynamic
  return `https://res.cloudinary.com/dyxybmew8/image/upload/${publicId}.jpg`;
};
