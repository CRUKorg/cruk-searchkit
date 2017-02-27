import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";

import CRUKSearchkitDidYouMean from '../../src/components/search/did-you-mean/CRUKSearchkitDidYouMean';

module.exports = (searchkit) => {
  searchkit.setResults({
    hits:{ total: 10 },
    suggest: {
      suggestions: [
        {
          options: [
            {
              text: 'cancer bone'
            }
          ]
        }
      ]
    }
  });

  const story = (
    <CRUKSearchkitDidYouMean searchkit={searchkit} />
  );

  return story;
}
