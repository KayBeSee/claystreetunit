import { Album } from "@ontour/types";

type Props = {
  [key: string]: Album;
};

export const music: Props = {
  ["a-mighty-fine-evening"]: {
    name: "A Mighty Fine Evening",
    slug: "a-mighty-fine-evening",
    year: 2022,
    type: "album",
    albumCoverUrl: "/album-covers/a-mighty-fine-evening.png",
    trackList: [
      "1200 Miles",
      "Tired of Being Tired",
      "Cost of Living",
      "Weight of the World",
    ],
    description: `This is filler text if we want to put a description of the record here. Don't leave your records in the sun. They'll warp and won't be any good for anyone. Don't leave your records in the sun. They get all wavy and they just won't run. They just won't play, just won't play, just won't play. Just won't play, just won't play, just won't play. Just won't play, just won't play, just won't play. Just won't play, just won't play no more`,
    otherImages: [],
    streamingLinks: {
      spotify: "https://open.spotify.com/album/3HhQMg7ob3cp5NayDVmQsF",
      apple:
        "https://music.apple.com/us/album/a-mighty-fine-evening-ep/1649821369",
      amazon: "https://music.amazon.com/albums/B0BJ4WKBRK",
      youtube:
        "https://music.youtube.com/playlist?list=OLAK5uy_kqfqpp40ssYy-fw6aAhEkWg7_JMk_l4cY",
    },
    pageStyle: {
      streamServiceColor: "fill-[#93c5fd]",
      albumCoverBorderColor: "bg-[#64211A]",
      backgroundColor: "bg-[#87332E]",
      primaryText: "text-[#EBEBEB]",
      secondaryText: "text-[#D4B494]",
      listenNowBorder: "border-[#64211A]",
    },
  },
  ["tired-of-being-tired"]: {
    name: "Tired of Being Tired",
    slug: "tired-of-being-tired",
    year: 2022,
    type: "single",
    albumCoverUrl: "/album-covers/tired-of-being-tired.png",
    trackList: [],
    description: `This is filler text if we want to put a description of the record here. Don't leave your records in the sun. They'll warp and won't be any good for anyone. Don't leave your records in the sun. They get all wavy and they just won't run. They just won't play, just won't play, just won't play. Just won't play, just won't play, just won't play. Just won't play, just won't play, just won't play. Just won't play, just won't play no more`,
    otherImages: [],
    streamingLinks: {
      spotify: "https://open.spotify.com/album/2OkUijeVAx9Pu51NlQkqzw",
      apple: "https://music.apple.com/us/album/tired-of-being-tired/1648148757",
      amazon: "https://music.amazon.com/albums/B0BH65JYLX",
      youtube:
        "https://music.youtube.com/playlist?list=OLAK5uy_kIq8NsYswJOeGh6Rg-5DA7mRu_aMrxBXU",
    },
    pageStyle: {
      streamServiceColor: "fill-[#60a5fa]",
      albumCoverBorderColor: "bg-[#BA1F2E]",
      backgroundColor: "bg-[#BA1F2E]",
      primaryText: "text-[#FAC39E]",
      secondaryText: "text-[#D4B494]",
      listenNowBorder: "border-[#993436]",
    },
  },
};
