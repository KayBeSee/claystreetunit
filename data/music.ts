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
      {
        name: "1200 Miles",
        url: "https://p.scdn.co/mp3-preview/646541a592fe86c89055704f8db277eaea6889df?cid=774b29d4f13844c495f206cafdad9c86",
      },
      {
        name: "Tired of Being Tired",
        url: "https://p.scdn.co/mp3-preview/bba9727d6732333e9ab0ed2a681d8512b1cdd2e4?cid=774b29d4f13844c495f206cafdad9c86",
      },
      {
        name: "Cost of Living",
        url: "https://p.scdn.co/mp3-preview/078422782139d702fc326d3bf1fb6c9d2f169fb2?cid=774b29d4f13844c495f206cafdad9c86",
      },
      {
        name: "Weight of the World",
        url: "https://p.scdn.co/mp3-preview/3b7b52ba5238a86a4c8395b0661b76726fe45598?cid=774b29d4f13844c495f206cafdad9c86",
      },
    ],
    description: `Clay Street Unit’s Debut EP “A Mighty Fine Evening” has been a few years in the making as Sam was working on these songs while the band solidified it’s current lineup, drawing on his experience moving out to Denver in his early 20’s and Colorado starting to feel more and more like home. \nThe songs took off from there and once the full group was able to work out the instrumentation, these first 4 tracks fell into place blending an emphasis on songwriting and a balanced, full band sound. \nThe group is currently working on their first full length record with more details coming soon!`,
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
      streamServiceColor: "fill-[#D2BDBB]",
      albumCoverBorderColor: "bg-[#702018]",
      backgroundColor: "bg-[#87332E]",
      primaryText: "text-[#EBEBEB]",
      secondaryText: "text-[#D4B494]",
      listenNowBorder: "border-[#702018]",
    },
  },
  // ["tired-of-being-tired"]: {
  //   name: "Tired of Being Tired",
  //   slug: "tired-of-being-tired",
  //   year: 2022,
  //   type: "single",
  //   albumCoverUrl: "/album-covers/tired-of-being-tired.png",
  //   trackList: [],
  //   description: `This is filler text if we want to put a description of the record here. Don't leave your records in the sun. They'll warp and won't be any good for anyone. Don't leave your records in the sun. They get all wavy and they just won't run. They just won't play, just won't play, just won't play. Just won't play, just won't play, just won't play. Just won't play, just won't play, just won't play. Just won't play, just won't play no more`,
  //   otherImages: [],
  //   streamingLinks: {
  //     spotify: "https://open.spotify.com/album/2OkUijeVAx9Pu51NlQkqzw",
  //     apple: "https://music.apple.com/us/album/tired-of-being-tired/1648148757",
  //     amazon: "https://music.amazon.com/albums/B0BH65JYLX",
  //     youtube:
  //       "https://music.youtube.com/playlist?list=OLAK5uy_kIq8NsYswJOeGh6Rg-5DA7mRu_aMrxBXU",
  //   },
  //   pageStyle: {
  //     streamServiceColor: "fill-[#60a5fa]",
  //     albumCoverBorderColor: "bg-[#BA1F2E]",
  //     backgroundColor: "bg-[#BA1F2E]",
  //     primaryText: "text-[#FAC39E]",
  //     secondaryText: "text-[#D4B494]",
  //     listenNowBorder: "border-[#8A1722]",
  //   },
  // },
};
