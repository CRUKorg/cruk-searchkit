import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";
import googleStub from './../../src/components/search/location/tests/google_helper/google_stub';

window.google = global.google = googleStub();

import CRUKSearchkitLocationInput from '../../src/components/search/location/CRUKSearchkitLocationInput'

module.exports = (searchkit) => {

  const story = (
    <div className="container">
      <CRUKSearchkitLocationInput
        searchkit={searchkit}
        field="location"
        id="loc"
      />
    </div>
  )

  // Story specific tests.
  // specs(() => describe('Location input', function () {
  //   it('Location input should have the geosuggest__input class', function () {
  //     let output = mount(story);
  //     expect(output.find('input[type="text"]').hasClass('geosuggest__input')).to.be.true;
  //   });
  // }));

  return story;
}
