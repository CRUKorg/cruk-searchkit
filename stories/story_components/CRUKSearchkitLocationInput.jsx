import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";
import GoogleMapsApiLoader from 'google-maps-api-loader'
GoogleMapsApiLoader({
    libraries: ['places'],
    apiKey: 'AIzaSyCdcUdy8gWHdOuXgS87yo9lVGWwTXOxS04' // optional 
})
.then(function(googleApi) {
    var autocomplete = new googleApi.maps.places.AutocompleteService();
}, function(err) {
    console.error(err);
});

import CRUKSearchkitLocationInput from '../../src/components/search/location/CRUKSearchkitLocationInput'

module.exports = (sk) => {
  const story = <CRUKSearchkitLocationInput searchkit={sk}/>

  // Story specific tests.
  specs(() => describe('Location input', function () {
    it('Location input should have the geosuggest__input class', function () {
      let output = mount(story);
      expect(output.find('input[type="text"]').hasClass('geosuggest__input')).to.be.true;
    });
  }));

  return story;
}
