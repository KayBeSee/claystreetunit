import axios from "axios";

const SPOTIFY_TOKEN =
  "BQAfbcMavNoWfKVsTSqlyjD4lAxC0v0Z1E6JlLuwTBrbGdudaN83DGrnIoJckvT2kYjc1RNE9H1XsadKN4FQnYXZIuoeN8tiRPLUJAnt6-io-DsXh9exhSmkMc5RK0-kaRYoI5Zd_iVWNO5B3aRMK_c2KDsB_8BDOTsEbI9sp3-tBRiP";

const main = async () => {
  const identifier = process.argv[2];

  const { data } = await axios(
    `https://api.spotify.com/v1/albums/${identifier}`,
    {
      headers: {
        Authorization: `Bearer ${SPOTIFY_TOKEN}`,
      },
    }
  );

  console.log(
    data.tracks.items.map((track) => {
      return {
        name: track.name,
        url: track.preview_url,
      };
    })
  );
};

main();
