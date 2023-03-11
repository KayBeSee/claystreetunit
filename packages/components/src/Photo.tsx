import Image from "next/image";

interface Props {
  src: string;
  onClick?: () => void;
}

export const Photo = ({ src, onClick }: Props) => {
  return (
    <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
      <Image
        className="group-hover:opacity-75 object-cover pointer-events-none"
        src={src}
        layout="fill"
      />
      <button
        type="button"
        className="absolute inset-0 focus:outline-none"
        onClick={onClick}
      >
        <span className="sr-only">View details for IMG_5214.HEIC</span>
      </button>
    </div>
  );
};
