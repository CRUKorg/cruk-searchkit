import React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../src/styles/common';

// Elastic url
const url = 'https://spp.dev.cruk.org/events__local_dipan/';

// Import story components
import CRUKSearchkitDateRangeStory from './story_components/CRUKSearchkitDateRange'
import CRUKSearchkitLocationInputStory from './story_components/CRUKSearchkitLocationInput'
import CRUKSearchkitSelectStory from './story_components/CRUKSearchkitSelect'

const stories = storiesOf('CRUK-searchkit', module);

stories.add('DateRange', () => CRUKSearchkitDateRangeStory(url));
stories.add('Location', () => CRUKSearchkitLocationInputStory(url));
stories.add('Select filter', () => CRUKSearchkitSelectStory(url));
