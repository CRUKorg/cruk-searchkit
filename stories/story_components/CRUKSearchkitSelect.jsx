import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";
import {
  SearchkitProvider,
  SearchkitManager
} from 'searchkit';

import CRUKSearchkitSelect from '../../src/components/ui/list/CRUKSearchkitSelect'
import CRUKSearchkitMenuFilter from '../../src/components/filters/menu/CRUKSearchkitMenuFilter'
import CRUKSearchkitSearchUI from '../../src/components/display/search/CRUKSearchkitSearchUI'

module.exports = (url) => {
  const sk = new SearchkitManager(url);

  const story = <SearchkitProvider searchkit={sk}>
    <CRUKSearchkitMenuFilter
      field="event_type"
      title=""
      id="type"
      listComponent={CRUKSearchkitSelect}
      orderKey="_term"
      showCount={false}
      translations={{ All: 'All types' }}
    />
  </SearchkitProvider>

  // Story specific tests.
  specs(() => describe('Select filter', function () {
    it('Widget should be select with at least two values', function () {
      let output = mount(story);
      console.log(output.find('select').html())
      expect(output.find('select').render()).to.be.true;
    });
  }));

  return story;
}
