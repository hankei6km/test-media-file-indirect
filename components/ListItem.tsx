import React from 'react';
// import Link from 'next/link';

import { Media } from '../lib/media';

type Props = {
  data: Media;
  apiPath: string;
};

const ListItem = ({ data, apiPath }: Props) => {
  const width =
    data.width > data.height
      ? 400
      : Math.round((data.width * 400) / data.height);
  const height =
    data.width > data.height
      ? Math.round((data.height * 400) / data.width)
      : 400;

  const q = new URLSearchParams('');
  q.append('w', `${width}`);
  q.append('h', `${height}`);

  const redirectUrl = `${apiPath}/${data.fileName}`;
  const redirectUrlApiParams = `${apiPath}/${data.fileName}?${q.toString()}`;
  const rawUrl = `${data.rawUrl}`;

  return (
    <>
      <div>
        <img
          width={width}
          height={height}
          src={redirectUrlApiParams}
          alt="リダイレクト版の表示"
        />
      </div>
      <div>
        <dl>
          <dt>生 URL:</dt>
          <dd>
            <a href={rawUrl}>{rawUrl}</a>
          </dd>
          <dt>リダイレクト Pathname:</dt>
          <dd>
            <a href={redirectUrl}>{redirectUrl}</a>
          </dd>
          <dt>リダイレクト Pathname(画像APIパラメータ付き):</dt>
          <dd>
            <a href={redirectUrlApiParams}>{redirectUrlApiParams}</a>
          </dd>
        </dl>
      </div>
    </>
  );
};
export default ListItem;
