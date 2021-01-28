import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout title="Home | microCMS のメディアファイルを間接的に使う実験">
    <h1>microCMS のメディアファイルを間接的に使う実験</h1>
    <ul>
      <li>
        <Link href="/redirect">
          <a>リダイレクトバージョン</a>
        </Link>
      </li>
      <li>
        <Link href="/forward">
          <a>フォワードバージョン</a>
        </Link>
      </li>
    </ul>
  </Layout>
);

export default IndexPage;
