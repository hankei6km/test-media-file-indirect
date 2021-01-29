import * as React from 'react';
import ListItem from './ListItem';
import { Media } from '../lib/media';

export type ListKind = 'direct' | 'redirect' | 'forward';
type Props = {
  kind: ListKind;
  items: Media[];
};

const List = ({ kind, items }: Props) => (
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
        <ListItem kind={kind} data={item} />
      </li>
    ))}
  </ul>
);

export default List;
