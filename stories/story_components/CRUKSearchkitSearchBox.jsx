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
      test
    />
  );

  return story;
}
