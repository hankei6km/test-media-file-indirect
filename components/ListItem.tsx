import React from 'react';
// import Link from 'next/link';

import { Media } from '../lib/media';

type Props = {
  data: Media;
  apiPath: string;
};

const ListItem = ({ data, apiPath }: Props) => {
  const q = new URLSearchParams('');
  q.append('w', '400');
  const redirectUrl = `${apiPath}/${data.fileName}${data.queryString}`;
  const redirectUrlApiParams = `${apiPath}/${data.fileName}?${q.toString()}`;
  const rawUrl = `${data.rawUrl}${data.queryString}`;
  return (
    <>
      <div>
        <img
          width="400"
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
