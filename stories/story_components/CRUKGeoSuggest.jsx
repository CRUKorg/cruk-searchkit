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

import CRUKGeoSuggest from '../../src/components/geosuggest/CRUKGeoSuggest'

module.exports = (sk) => {
  const story = <CRUKGeoSuggest searchkit={sk}/>

  // Story specific tests.
  specs(() => describe('CRUKGeoSuggest', function () {
    it('CRUKGeoSuggest Should have the geosuggest__input class', function () {
      let output = mount(story);
      expect(output.find('input[type="text"]').hasClass('geosuggest__input')).to.be.true;
    });
  }));

  return story;
}
