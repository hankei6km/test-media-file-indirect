import { NextApiRequest, NextApiResponse } from 'next';
import { mediaUrl } from '../../../lib/media';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const m = await mediaUrl(req?.query);
    if (m) {
      res.redirect(307, m);
    } else {
      res.status(404);
    }
    res.end();
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
