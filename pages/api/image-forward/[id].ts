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
        const img = await fetch(m);
        if (img.ok) {
          // https://github.com/vercel/next.js/discussions/15453#discussioncomment-41926
          const header = {
            'Content-Type': img.headers.get('Content-Type'),
            'Content-Length': img.headers.get('Content-Length'),
            // この辺をきちんと呼んだ方が良い https://vercel.com/docs/edge-network/caching
            // age: img.headers.get('age'),
            'cache-control': img.headers.get('cache-control')
          };
          if (
            header['Content-Type'] &&
            header['Content-Length'] &&
            // header['age'] &&
            header['cache-control']
          ) {
            res.writeHead(img.status, {
              'Content-Type': header['Content-Type'],
              'Content-Length': header['Content-Length'],
              // age: header['age'],
              'cache-control': header['cache-control']
            });
            // 定義と作成されるインスタンスの整合性がとれないのでとりあえず any
            // 定義では pipeTo だが実際のインスタンスは pipe.
            await (img as any).body.pipe(res);
            return;
          } else {
            res
              .status(500)
              .json({ statusCode: 500, message: 'content header is invalid' });
          }
        } else {
          res.status(500).json({
            statusCode: 500,
            message: `image fetch error: ${img.statusText}`
          });
        }
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
