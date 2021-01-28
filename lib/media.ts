import { basename } from 'path';

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
  queryString: string;
};

export async function getMediaItems(
  reqQuery: Record<string, string | string[]>
): Promise<Media[]> {
  if (process.env.GET_API_KEY === undefined) {
    console.error('$GET_API_KEY not defined');
    throw new Error('env vars error: see server log');
  } else if (process.env.API_BASE_URL === undefined) {
    console.error('$API_BASE_URL not defined');
    throw new Error('env vars error: see server log');
  } else {
    const q = new URLSearchParams('');
    q.append('fields', 'media');
    if (reqQuery.id) {
      q.append('filters', `media[contains]${reqQuery.id}`);
    }
    const r = await fetch(`${process.env.API_BASE_URL}media?${q.toString()}`, {
      method: 'GET',
      headers: { 'X-API-KEY': process.env.GET_API_KEY || '' }
    }).catch((err) => {
      throw err.name;
    });
    if (r.ok) {
      const q = new URLSearchParams('');
      Object.entries(reqQuery).forEach(([k, v]) => {
        if (k !== 'id') {
          q.append(k, typeof v === 'string' ? v : v.join(','));
        }
      });
      const tmp = q.toString();
      const qs = `${tmp !== '' ? `?${tmp}` : ''}`;
      return (await r.json()).contents.map((content: Content) => {
        const fileName = basename(new URL(content.media.url).pathname);
        return {
          fileName: fileName,
          rawUrl: content.media.url,
          queryString: qs
        };
      });
    }
  }
  return [];
}

export async function mediaUrl(
  reqQuery: Record<string, string | string[]>
): Promise<string> {
  const items = await getMediaItems(reqQuery);
  if (items && items.length > 0) {
    return `${items[0].rawUrl}${items[0].queryString}`;
  }
  return '';
}
