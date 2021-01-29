import React from 'react';
// import Link from 'next/link';
import { ListKind } from './List';

import { Media } from '../lib/media';

type Props = {
  kind: ListKind;
  data: Media;
};

const ListItem = ({ kind, data }: Props) => {
  const apiPath =
    kind === 'direct'
      ? ''
      : kind === 'redirect'
      ? '/api/image-redirect'
      : '/api/image-forward';
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

  const rawUrl = `${data.rawUrl}`;
  const indirectPath = `${apiPath}/${data.fileName}`;
  const imageUrl = kind === 'direct' ? data.rawUrl : indirectPath;
  const imageUrlResized = `${imageUrl}?${q.toString()}`;

  return (
    <>
      <div>
        <img
          width={width}
          height={height}
          src={imageUrlResized}
          alt="サンプルの表示"
        />
      </div>
      <div>
        <dl>
          <dt>生 URL:</dt>
          <dd>
            <a href={rawUrl}>{rawUrl}</a>
          </dd>
          {kind !== 'direct' && (
            <>
              <dt>間接的 URL(path):</dt>
              <dd>
                <a href={indirectPath}>{indirectPath}</a>
              </dd>
            </>
          )}
          <dt>サイズ変更パラメータ付き URL(path):</dt>
          <dd>
            <a href={imageUrlResized}>{imageUrlResized}</a>
          </dd>
        </dl>
      </div>
    </>
  );
};
export default ListItem;
