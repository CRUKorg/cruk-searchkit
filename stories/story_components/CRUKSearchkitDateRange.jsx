import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";

import CRUKSearchkitDateRange from '../../src/components/search/date/CRUKSearchkitDateRange'

module.exports = (sk) => {
  const story = <CRUKSearchkitDateRange searchkit={sk} />

  // Story specific tests.
  specs(() => describe('Date range', function () {
    it('StartDate should have the DateInput__input class', function () {
      let output = mount(story);
      expect(output.find('[name="startDate"]').hasClass('DateInput__input')).to.be.true;
    });
  }));

  return story;
}
