import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";

import CRUKSearchkitAlert from '../../src/components/display/alert/CRUKSearchkitAlert';

module.exports = (searchkit) => {
  searchkit.loading = false;
  const cookie1 = 'cru-hu-alert-test-id-1=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  const cookie2 = 'cru-hu-alert-test-id-2=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  const cookie3 = 'cru-hu-alert-test-id-3=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

  document.cookie = `${cookie1}${cookie2}${cookie3}`;
  const story = (
    <div>
      <CRUKSearchkitAlert
        searchkit={searchkit}
        id="test-id-1"
        text={<span>Warning message</span>}
        animation="shake"
        dismissable={true}
      />

      <CRUKSearchkitAlert
        searchkit={searchkit}
        id="test-id-2"
        type="info"
        text={<span>Info message</span>}
        animation="bounce"
        dismissable={true}
      />

      <CRUKSearchkitAlert
        searchkit={searchkit}
        id="test-id-3"
        type="error"
        text={<span>Error message</span>}
        dismissable={true}
      />
    </div>
  );

  return story;
}
