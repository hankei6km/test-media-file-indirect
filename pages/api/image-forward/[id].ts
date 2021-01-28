import { NextApiRequest, NextApiResponse } from 'next';
import { mediaUrl } from '../../../lib/media';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const m = await mediaUrl(req?.query);
    if (m) {
      const img = await fetch(m);
      if (img.ok) {
        // https://github.com/vercel/next.js/discussions/15453#discussioncomment-41926
        const header = {
          'Content-Type': img.headers.get('Content-Type'),
          'Content-Length': img.headers.get('Content-Length')
        };
        if (header['Content-Type'] && header['Content-Length']) {
          // console.log(header['Content-Type'], header['Content-Length']);
          res.writeHead(200, {
            'Content-Type': header['Content-Type'],
            'Content-Length': header['Content-Length']
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
    res.end();
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;