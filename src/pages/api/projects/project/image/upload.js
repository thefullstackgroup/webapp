import { withAuthUserTokenAPI } from '../../../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../../../firebase/initFirebaseApp';
import AWS from 'aws-sdk';
import formidable from 'formidable-serverless';
import fs from 'fs';
import path from 'path';

initAuth();
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint('fra1.digitaloceanspaces.com'),
    accessKeyId: process.env.SPACES_ACCESS_KEY,
    secretAccessKey: process.env.SPACES_SECRET_KEY,
    region: 'fra1',
  });

  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) res.status(500);

    const file = fs.readFileSync(files.file.path);
    const filename = files.file.name;

    s3.upload({
      Bucket: 'terrabyte',
      ACL: 'public-read',
      Key: `galleries/users/${fields.id}/profile-${fields.id}-${
        path.parse(filename).name
      }.${path.parse(filename).ext}`,
      Body: file,
      ContentType: files.file.type,
    }).send((err, data) => {
      if (err) {
        res.status(500).json({ message: 'Something wrong' });
      }
      if (data) {
        res.status(200).json({
          url: data.Location,
        });
      } else {
        res.status(415).json({
          message: 'Bad request',
        });
      }
    });
  });
};

export default withAuthUserTokenAPI(handler);
// export default handler;
