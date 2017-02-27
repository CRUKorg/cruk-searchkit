import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";

import CRUKSearchkitResult from '../../src/components/display/result/CRUKSearchkitResult';

module.exports = (searchkit) => {
  const result = {
    _source: {
      url: 'http://madeup.com',
      title: 'Mocking a title',
      description: 'Some descriptive text that does not exist'
    }
  };

  const story = (
    <CRUKSearchkitResult
      searchkit={searchkit}
      result={result}
    />
  );

  return story;
}
