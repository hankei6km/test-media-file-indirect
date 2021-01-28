import * as React from 'react';
import ListItem from './ListItem';
import { Media } from '../lib/media';

type Props = {
  items: Media[];
  apiPath: string;
};

const List = ({ items, apiPath }: Props) => (
  <ul
    style={{
      listStyle: 'none'
      //'& li::before': {
      //  content: '\u200B'
      //}
    }}
  >
    {items.map((item) => (
      <li key={item.rawUrl}>
        <ListItem data={item} apiPath={apiPath} />
      </li>
    ))}
  </ul>
);

export default List;
