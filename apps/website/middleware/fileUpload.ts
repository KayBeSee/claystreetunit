import nextConnect from 'next-connect';
import multer from 'multer';

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const middleware = nextConnect();

middleware.use(upload);

export default middleware;
