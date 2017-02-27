import React from 'react';
import GoogleMapsApiLoader from 'google-maps-api-loader';
import { storiesOf } from '@kadira/storybook';

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
const CenterDecorator = (story) => (
  <div className="container">
    {story()}
  </div>
);

const stories = storiesOf('CRUK-searchkit', module);

const div = document.createElement('div');
div.id = 'searchPrototypeApp';
document.body.append(div);

stories.addDecorator(CenterDecorator);
stories.addWithInfo('CRUKSearchkitSearchBox', () => CRUKSearchkitSearchBox(sk));
stories.addWithInfo('CRUKSearchkitSearchBox with autocomplete', () => CRUKSearchkitSearchBoxAutocomplete(sk));
stories.addWithInfo('CRUKSearchkitDateRange', () => CRUKSearchkitDateRangeStory(sk));
stories.addWithInfo('CRUKSearchkitLocationInput', () => CRUKSearchkitLocationInputStory(sk));
stories.addWithInfo('CRUKSearchkitSelect', () => CRUKSearchkitSelectStory(sk));
stories.addWithInfo('CRUKSearchkitDidYouMean', () => CRUKSearchkitDidYouMean(sk));
stories.addWithInfo('CRUKSearchkitPagination', () => CRUKSearchkitPagination(sk));
stories.addWithInfo('CRUKSearchkitAlert', () => CRUKSearchkitAlert(sk));
stories.addWithInfo('CRUKSearchkitLoading', () => CRUKSearchkitLoading(sk));
stories.addWithInfo('CRUKSearchkitHelpText', () => CRUKSearchkitHelpText(sk));
stories.addWithInfo('CRUKSearchkitSummary', () => CRUKSearchkitSummary(sk));
stories.addWithInfo('CRUKSearchkitResultsList', () => CRUKSearchkitResultsList(sk));
stories.addWithInfo('CRUKSearchkitResult', () => CRUKSearchkitResult(sk));
stories.addWithInfo('CRUKSearchkitNoResults', () => CRUKSearchkitNoResults(sk));
stories.addWithInfo('CRUKSearchkitNoResults if error', () => CRUKSearchkitNoResultsError(sk));
