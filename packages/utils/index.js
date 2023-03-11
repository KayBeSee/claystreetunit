import axios from "axios";

const SPOTIFY_TOKEN =
  "BQDZ6bHzdKBVve32DEg3QzMEGyH0b-5e15spTZKi_CHPPb6xeiyChKJes1ZztGweBm2w2bByJX2jP012dd-4eqNcQZ2a5CUR-m4PzhzDtfd2_nmNihwb9YsOuumAlgYxo63RJ9dCPb3cn0ikw8pnv4rhch6m6FiS6EIQK4eNqR6ImJdb";

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
