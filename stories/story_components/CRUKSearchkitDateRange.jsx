import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";

import CRUKSearchkitDateRange from '../../src/components/search/date/CRUKSearchkitDateRange'

module.exports = (searchkit) => {

  const story = (
    <CRUKSearchkitDateRange
      searchkit={searchkit}
      startDateField="date_start"
      endDateField="date_end"
      field="date_start"
      id="date"
      showClearDates
    />
  );

  return story;
}
