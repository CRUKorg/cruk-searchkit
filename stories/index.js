import React from 'react'
import GoogleMapsApiLoader from 'google-maps-api-loader'
import { storiesOf, action, linkTo } from '@kadira/storybook'
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

storiesOf('CRUK-searchkit', module)
  .add('DateRange', () => (
    <SearchkitProvider searchkit={sk}>
      <CRUKDateRange showApp={linkTo('CRUKDateRange')}/>
    </SearchkitProvider>
  ));

storiesOf('CRUK-searchkit', module)
  .add('GeoSuggest', () => (
    <SearchkitProvider searchkit={sk}>
      <CRUKGeoSuggest showApp={linkTo('CRUKDateRange')}/>
    </SearchkitProvider>
  ));
