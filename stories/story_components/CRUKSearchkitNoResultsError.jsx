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
  searchkit.initialLoading = false;
  searchkit.error = true;
  searchkit.query = new ImmutableQuery();
  searchkit.query.index.queryString = 'test query';

  const story = (
    <CRUKSearchkitNoResults
      searchkit={searchkit}
    />
  );

  return story;
}
