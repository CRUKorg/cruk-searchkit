import React from 'react'
import GoogleMapsApiLoader from 'google-maps-api-loader'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";

GoogleMapsApiLoader({
    libraries: ['places'],
    apiKey: 'AIzaSyCdcUdy8gWHdOuXgS87yo9lVGWwTXOxS04' // optional 
})
.then(function(googleApi) {
    var autocomplete = new googleApi.maps.places.AutocompleteService();
}, function(err) {
    console.error(err);
});

import {
  SearchkitManager,
  SearchkitProvider,
  MultiMatchQuery
} from 'searchkit';


import CRUKDateRange from '../src/components/date/CRUKDateRange'
import CRUKGeoSuggest from '../src/components/geosuggest/CRUKGeoSuggest'

import '../src/styles/common';

const url = 'https://spp.dev.cruk.org/events__local_dipan/';
const sk = new SearchkitManager(url);
const gtmId = 'GTM-H4B7';

const stories = storiesOf('CRUK-searchkit', module);

stories.add('DateRange', function () {
  const story = <CRUKDateRange className="baraba" searchkit={sk} showApp={linkTo('CRUKDateRange')}/>

  specs(() => describe('DateRange', function () {
    it('Should have the DateRangePicker class', function () {
      let output = mount(story);
      console.log(output.hasClass('baraba'))
      expect(output.hasClass('baraba')).to.be.true;
      //expect(true).to.be.true;
    });
  }));

  return story;
});

