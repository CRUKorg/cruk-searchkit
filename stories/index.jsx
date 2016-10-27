import React from 'react'
import { storiesOf } from '@kadira/storybook'

import {
  SearchkitManager,
} from 'searchkit';
import '../src/styles/common';

const url = 'https://spp.dev.cruk.org/events__local_dipan/';
const sk = new SearchkitManager(url);

// Import story components
import CRUKSearchkitDateRangeStory from './story_components/CRUKSearchkitDateRange'
import CRUKSearchkitLocationInputStory from './story_components/CRUKSearchkitLocationInput'
import CRUKSearchkitSelectStory from './story_components/CRUKSearchkitSelect'

const stories = storiesOf('CRUK-searchkit', module);

stories.add('DateRange', () => CRUKSearchkitDateRangeStory(sk));
stories.add('Location', () => CRUKSearchkitLocationInputStory(sk));
stories.add('Select', () => CRUKSearchkitSelectStory(sk));
