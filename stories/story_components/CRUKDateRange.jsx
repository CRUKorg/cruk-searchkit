import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";

import CRUKDateRange from '../../src/components/date/CRUKDateRange'

module.exports = (sk) => {
  const story = <CRUKDateRange searchkit={sk} />

  // Story specific tests.
  specs(() => describe('CRUKDateRange', function () {
    it('StartDate Should have the DateInput__input class', function () {
      let output = mount(story);
      expect(output.find('[name="startDate"]').hasClass('DateInput__input')).to.be.true;
    });
  }));

  return story;
}
