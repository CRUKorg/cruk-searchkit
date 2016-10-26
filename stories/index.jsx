import React from 'react'
import { storiesOf } from '@kadira/storybook'

import {
  SearchkitManager,
} from 'searchkit';
import '../src/styles/common';

const url = 'https://spp.dev.cruk.org/events__local_dipan/';
const sk = new SearchkitManager(url);

// Import story components
import CRUKDateRangeStory from './story_components/CRUKDateRange'
import CRUKGeoSuggestStory from './story_components/CRUKGeoSuggest'

const stories = storiesOf('CRUK-searchkit', module);

stories.add('DateRange', () => CRUKDateRangeStory(sk));
stories.add('GeoSuggest', () => CRUKGeoSuggestStory(sk));
