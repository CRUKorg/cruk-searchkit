import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";
import {
  ImmutableQuery
} from 'searchkit';

import CRUKSearchkitPagination from '../../src/components/search/pagination/CRUKSearchkitPagination';

module.exports = (searchkit) => {
  const accessor = searchkit.accessors.statefulAccessors["p"];
  searchkit.query = new ImmutableQuery().setSize(10);

  searchkit.setResults({
    hits:{
      total: 81
    }
  });

  const story = (
    <CRUKSearchkitPagination
      searchkit={searchkit}
      showNumbers={false}
      pageScope={3}
    />
  );

  return story;
}
