import React from 'react'
import GoogleMapsApiLoader from 'google-maps-api-loader'
import { storiesOf } from '@kadira/storybook'
import {
  SearchkitManager
} from 'searchkit';

import '../src/styles/common';

// Import story components
import CRUKSearchkitSearchBox from './story_components/CRUKSearchkitSearchBox';
import CRUKSearchkitSearchBoxAutocomplete from './story_components/CRUKSearchkitSearchBoxAutocomplete';
import CRUKSearchkitDateRangeStory from './story_components/CRUKSearchkitDateRange';
import CRUKSearchkitLocationInputStory from './story_components/CRUKSearchkitLocationInput';
import CRUKSearchkitSelectStory from './story_components/CRUKSearchkitSelect';
import CRUKSearchkitPagination from './story_components/CRUKSearchkitPagination';
import CRUKSearchkitDidYouMean from './story_components/CRUKSearchkitDidYouMean';
import CRUKSearchkitAlert from './story_components/CRUKSearchkitAlert';
import CRUKSearchkitLoading from './story_components/CRUKSearchkitLoading';
import CRUKSearchkitHelpText from './story_components/CRUKSearchkitHelpText';
import CRUKSearchkitSummary from './story_components/CRUKSearchkitSummary';
import CRUKSearchkitResultsList from './story_components/CRUKSearchkitResultsList';
import CRUKSearchkitResult from './story_components/CRUKSearchkitResult';
import CRUKSearchkitNoResults from './story_components/CRUKSearchkitNoResults';
import CRUKSearchkitNoResultsError from './story_components/CRUKSearchkitNoResultsError';

const sk = SearchkitManager.mock();

const stories = storiesOf('CRUK-searchkit', module);

const div = document.createElement('div');
div.id = 'searchPrototypeApp';
document.body.append(div);

stories.add('CRUKSearchkitSearchBox', () => CRUKSearchkitSearchBox(sk));
stories.add('CRUKSearchkitSearchBoxAutocomplete', () => CRUKSearchkitSearchBoxAutocomplete(sk));
stories.add('CRUKSearchkitDateRangeStory', () => CRUKSearchkitDateRangeStory(sk));
stories.add('CRUKSearchkitLocationInputStory', () => CRUKSearchkitLocationInputStory(sk));
stories.add('CRUKSearchkitSelectStory', () => CRUKSearchkitSelectStory(sk));
stories.add('CRUKSearchkitPagination', () => CRUKSearchkitPagination(sk));
stories.add('CRUKSearchkitAlert', () => CRUKSearchkitAlert(sk));
stories.add('CRUKSearchkitLoading', () => CRUKSearchkitLoading(sk));
stories.add('CRUKSearchkitHelpText', () => CRUKSearchkitHelpText(sk));
stories.add('CRUKSearchkitSummary', () => CRUKSearchkitSummary(sk));
stories.add('CRUKSearchkitResultsList', () => CRUKSearchkitResultsList(sk));
stories.add('CRUKSearchkitResult', () => CRUKSearchkitResult(sk));
stories.add('CRUKSearchkitNoResults', () => CRUKSearchkitNoResults(sk));
stories.add('CRUKSearchkitNoResults if error', () => CRUKSearchkitNoResultsError(sk));
