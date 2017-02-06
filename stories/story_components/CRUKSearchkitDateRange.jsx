import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";
import {
  SearchkitProvider,
  SearchkitManager
} from 'searchkit';

import CRUKSearchkitDateRange from '../../src/components/search/date/CRUKSearchkitDateRange'

module.exports = (url) => {
  const sk = new SearchkitManager(url);

  const story = <SearchkitProvider searchkit={sk}>
    <CRUKSearchkitDateRange
      field="date_start"
      id="date"
    />
  </SearchkitProvider>
  // Story specific tests.
  specs(() => describe('Date range', function () {
    it('StartDate should have the DateInput__input class', function () {
      var m = new Date();
      var dateString = m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
      console.log(dateString)
      setTimeout(function(){
        var m = new Date();
        var dateString = m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
        console.log(dateString)
        let output = mount(story);
        console.log(output.find('select').html())
        expect(output.find('[name="startDate"]').hasClass('DateInput__input')).to.be.true;
      }, 3000);
    });
  }));

  return story;
}
