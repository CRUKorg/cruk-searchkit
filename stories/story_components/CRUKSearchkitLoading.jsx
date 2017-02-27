import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";
import {
  MultiMatchQuery,
  QueryAccessor
} from 'searchkit';

import CRUKSearchkitLoading from '../../src/components/display/loading/CRUKSearchkitLoading';

module.exports = (searchkit) => {
  searchkit.loading = true;

  const story = (
    <CRUKSearchkitLoading searchkit={searchkit} />
  );

  return story;
}
