import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { PhotoIcon } from "@heroicons/react/24/outline";

import { Button } from "./Button";

interface Props {
  show: any;
  onChange: (files: File[]) => void;
}

export const PhotoEmptyState = ({ show, onChange }: Props) => {
  const router = useRouter();

  return (
    <div className="w-full relative">
      <div className="opacity-10 md:opacity-100 -mt-10 md:mt-0 absolute right-0 md:right-0 top-10 md:-top-6">
        <div className="flex transform rotate-12">
          <Image
            className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl shadow"
            src={"/page-backgrounds/info.jpg"}
            width={200}
            height={150}
          />
        </div>
      </div>
      <div className="invisible md:visible absolute right-0 md:right-8 top-10 md:-top-6">
        <div className="flex transform rotate-6">
          <Image
            className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl shadow"
            src={"/band-photo.jpeg"}
            width={200}
            height={150}
          />
        </div>
      </div>
      <div className="invisible md:visible absolute right-0 md:right-20 top-10 md:-top-6">
        <div className="flex transform rotate-3">
          <Image
            className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl shadow"
            src={"/page-backgrounds/news.jpg"}
            width={200}
            height={150}
          />
        </div>
      </div>
      <div className="z-[1]">
        <div className="space-y-1">
          <h2 className="text-slate-500 flex font-bold">
            Snapped a great photo at the show?{" "}
          </h2>
          <p className="text-slate-400 max-w-sm">
            Send us photos your took at the show and we’ll feature our favorites
            here.
          </p>
        </div>

        <label
          htmlFor="file-upload"
          className="cursor-pointer group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-sicard-blue-100 text-sicard-blue-700 hover:bg-sicard-blue-200 hover:text-sicard-blue-900 focus:ring-sicard-blue-500 mt-8"
        >
          <span className="text-white">Add photos</span>
          <svg
            className="overflow-visible ml-3 text-gray-100 group-hover:text-white"
            width="3"
            height="6"
            viewBox="0 0 3 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0L3 3L0 6"></path>
          </svg>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            multiple
            accept="image/*;video/*;capture=camcorder"
            className="sr-only"
            onChange={(e) => {
              onChange(Array.from(e.target.files));
            }}
          />
        </label>
      </div>
    </div>
  );
};
