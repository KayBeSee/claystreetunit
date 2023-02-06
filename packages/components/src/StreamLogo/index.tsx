import React from "react";

import { AudioSource } from "@ontour/archive";

import {
  AppleMusic,
  AmazonMusic,
  Spotify,
  YoutubeMusic,
  InternetArchive,
} from "./logos";

import { getAudioSourceLink } from "./utils";

const streamingProviders = {
  apple: AppleMusic,
  amazon: AmazonMusic,
  spotify: Spotify,
  youtube: YoutubeMusic,
  archive: InternetArchive,
};

interface Props {
  source: AudioSource;
}

export const StreamLogo = ({ source }: Props) => {
  const StreamLogo = streamingProviders[source.provider];

  return (
    <a
      href={getAudioSourceLink(source)}
      target="_blank"
      className="flex items-center justify-center w-40 h-16 md:w-28 md:h-12 relative"
      key={source.identifier}
    >
      <StreamLogo
        className={`w-40 h-24 md:w-28 md:h-12 fill-slate-600 hover:fill-slate-800 hover:scale-110 transition duration-300 cursor-pointer`}
      />
    </a>
  );
};

export * from "./logos";
