import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Media, getMediaItems } from '../../lib/media';
import Layout from '../../components/Layout';
import List from '../../components/List';

type Props = { items: Media[] };

const WithStaticProps = ({ items }: Props) => (
  <Layout title="test media file indirect: raw url version">
    <h1>生の URL で画像を表示</h1>
    <p> microCMS のメディアファイル(画像)を生の URL を利用して表示</p>
    <List kind={'direct'} items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const items: Media[] = await getMediaItems([
    '2020-11-03-yoko1.jpg',
    '2020-11-03-tate2.jpg',
    '2020-11-03-yoko2.jpg',
    '2010-11-03-tate1.jpg'
  ]);
  return { props: { items } };
};

export default WithStaticProps;
