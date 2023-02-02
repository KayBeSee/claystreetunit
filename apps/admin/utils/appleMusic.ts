import jwt from 'jsonwebtoken';

export const getAppleMusicToken = () => {
  const privateKey = Buffer.from(
    process.env.APPLE_MUSIC_PRIVATE_KEY_HEX,
    'hex'
  );
  const apiKeyId = 'YW46994594';
  const issuerId = '22JN9G7H4W';
  let now = Math.round(new Date().getTime() / 1000);
  let nowPlus20 = now + 1199; // 1200 === 20 minutes

  let payload = {
    iss: issuerId,
    exp: nowPlus20,
    iat: now,
  };

  let signOptions = {
    algorithm: 'ES256', // you must use this algorithm, not jsonwebtoken's default
    header: {
      alg: 'ES256',
      kid: apiKeyId,
      typ: 'JWT',
    },
  };

  let token = jwt.sign(payload, privateKey, signOptions);
  return token;
};
