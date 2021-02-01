import { NextApiRequest, NextApiResponse } from 'next';
import { mediaUrl } from '../../../lib/media';

// https://vercel.com/knowledge/how-to-enable-cors?query=access-control-allow-origin
const allowCors = (
  fn: (req: NextApiRequest, res: NextApiResponse<any>) => Promise<void>
) => async (req: NextApiRequest, res: NextApiResponse) => {
  // res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*');
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    // 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
    'GET,OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const m = await mediaUrl(req?.query);
      if (m) {
        res.redirect(307, m);
      } else {
        res.status(404);
      }
    } else {
      res.status(500).json({ statusCode: 500, message: 'bad request' });
    }
    res.end();
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default allowCors(handler);
