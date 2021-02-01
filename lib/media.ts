import { basename } from 'path';
const apiRes = require('./$items.json');

export type Content = {
  media: {
    url: string;
    width: number;
    height: number;
  };
};
export type Media = {
  fileName: string;
  rawUrl: string;
  width: number;
  height: number;
};

export async function getMediaItems(files: string[]): Promise<Media[]> {
  if (process.env.GET_API_KEY === undefined) {
    console.error('$GET_API_KEY not defined');
    throw new Error('env vars error: see server log');
  } else if (process.env.API_BASE_URL === undefined) {
    console.error('$API_BASE_URL not defined');
    throw new Error('env vars error: see server log');
  } else {
    const q = new URLSearchParams('');
    q.append('limit', '1000');
    q.append('fields', 'media');
    if (files.length > 0) {
      q.append('filters', `media[equals]${files.join('[or]media[equals]')}`);
    }
    const r = await fetch(`${process.env.API_BASE_URL}media?${q.toString()}`, {
      method: 'GET',
      headers: { 'X-API-KEY': process.env.GET_API_KEY || '' }
    }).catch((err) => {
      throw err.name;
    });
    if (r.ok) {
      const items = (await r.json()).contents.map((content: Content) => {
        const fileName = basename(new URL(content.media.url).pathname);
        return {
          fileName: fileName,
          rawUrl: content.media.url,
          width: content.media.width,
          height: content.media.height
        };
      });
      return items;
    }
  }
  return [];
}

export async function getMediaItemsFromFile(files: string[]): Promise<Media[]> {
  const items = (apiRes.contents as Content[]).map(({ media }) => {
    const fileName = basename(new URL(media.url).pathname);
    return {
      fileName: fileName,
      rawUrl: media.url,
      width: media.width,
      height: media.height
    };
  });
  if (files.length > 0) {
    return items.filter((item: Media) =>
      files.some((file) => file === item.fileName)
    );
  }
  return items;
}

export async function mediaUrl(
  reqQuery: Record<string, string | string[]>
): Promise<string> {
  let files: string[] = [];
  if (reqQuery.id) {
    files = files.concat(reqQuery.id);
  }
  let items: Media[] = [];
  if (process.env.USE_GET_API_FORCE !== 'true') {
    items = await getMediaItemsFromFile(files);
  }
  if (items && items.length > 0) {
    console.log(`hit: ${reqQuery.id}`);
  } else {
    items = await getMediaItems(files);
  }
  if (items && items.length > 0) {
    const q = new URLSearchParams('');
    Object.entries(reqQuery).forEach(([k, v]) => {
      if (k !== 'id') {
        q.append(k, typeof v === 'string' ? v : v.join(','));
      }
    });
    const tmp = q.toString();
    const qs = `${tmp !== '' ? `?${tmp}` : ''}`;
    return `${items[0].rawUrl}${qs}`;
  }
  return '';
}
