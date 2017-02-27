import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";

import CRUKSearchkitHelpText from '../../src/components/display/help-text/CRUKSearchkitHelpText';

module.exports = (searchkit) => {
  const helpJsx = (
    <div>
      <h1>
        This is <strong>custom help text</strong>
      </h1>
      <h4>
        Any markup can be added here.
      </h4>
    </div>
  );

  const story = (
    <CRUKSearchkitHelpText
      searchkit={searchkit}
      helptext={helpJsx}
      test
    />
  );
  return story;
}
