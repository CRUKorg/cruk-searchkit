import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";
import {
  ImmutableQuery
} from 'searchkit';

import CRUKSearchkitSummary from '../../src/components/display/summary/CRUKSearchkitSummary';

module.exports = (searchkit) => {
  const hits = '123456789'.split('').map((x,i) => {
    const counter = i + 1;
    return {
      _id: counter,
      _source: {
        url: `http://madeup.com/${counter}`,
        title: `Mocking a title #${counter}`,
        description: `Some descriptive text that does not exist #${counter}`
      }
    }
  });

  const results = {
    hits: {
      total: hits.length,
      hits: hits
    }
  }

  searchkit.setResults(results);

  searchkit.query = new ImmutableQuery();
  searchkit.query.index.queryString = 'test query';

  const story = (
    <CRUKSearchkitSummary
      searchkit={searchkit}
    />
  );

  return story;
}
