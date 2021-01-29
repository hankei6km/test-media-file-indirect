import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Media, getMediaItems } from '../../lib/media';
import Layout from '../../components/Layout';
import List from '../../components/List';

type Props = { items: Media[] };

const WithStaticProps = ({ items }: Props) => (
  <Layout title="test media file indirect: redirect version">
    <h1>リダイレクトで画像を表示</h1>
    <p> microCMS のメディアファイル(画像)をリダイレクト経由で表示。</p>
    <List items={items} apiPath={'/api/image-redirect'} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const items: Media[] = await getMediaItems({});
  return { props: { items } };
};

export default WithStaticProps;
