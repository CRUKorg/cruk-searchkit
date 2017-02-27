import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";
import {
  MultiMatchQuery,
  QueryAccessor
} from 'searchkit';

import CRUKSearchkitSearchBox from '../../src/components/search/search-box/CRUKSearchkitSearchBox';

module.exports = (searchkit) => {
  const div = document.createElement('div');
  div.id = 'searchPrototypeApp';
  document.body.append(div);

  const autocompleteItems = ['item1', 'Item2'];

  const story = (
     <CRUKSearchkitSearchBox
      searchkit={searchkit}
      id="q"
      queryBuilder={MultiMatchQuery}
      queryOptions={{
        analyzer: 'cruk_standard'
      }}
      queryFields={['title', 'description']}
      placeholder="Search..."
      autocompleteEnable
      test
      autocompleteItems={autocompleteItems}
      autofocus
    />
  );

  return story;
}
