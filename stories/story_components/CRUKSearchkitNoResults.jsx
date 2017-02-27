import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";
import {
  ImmutableQuery
} from 'searchkit';

import CRUKSearchkitNoResults from '../../src/components/display/no-results/CRUKSearchkitNoResults';

module.exports = (searchkit) => {
  searchkit.setResults({});
  searchkit.initialLoading = false;
  searchkit.error = false;
  searchkit.query = new ImmutableQuery();
  searchkit.query.index.queryString = 'test query';

  const story = (
    <CRUKSearchkitNoResults
      searchkit={searchkit}
    />
  );

  return story;
}
