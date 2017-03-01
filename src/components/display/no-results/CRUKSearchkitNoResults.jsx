import * as React from 'react';

import {
  SearchkitComponent,
  SearchkitComponentProps,
  FastClick,
  NoFiltersHitCountAccessor,
  SuggestionsAccessor,
  ReactComponentType
} from 'searchkit';

import CRUKSearchkitNoResultsErrorDisplay from './CRUKSearchkitNoResultsErrorDisplay';
import CRUKSearchkitNoResultsDisplay from './CRUKSearchkitNoResultsDisplay';

const defaults = require('lodash/defaults');

export default class CRUKSearchkitNoResults extends SearchkitComponent {
  noFiltersAccessor: NoFiltersHitCountAccessor
  suggestionsAccessor: SuggestionsAccessor

  static translations = {
    'NoHits.NoResultsFound': 'No results found for {query}.',
    'NoHits.NoResultsFoundDidYouMean': 'No results found for {query}. Did you mean {suggestion}?',
    'NoHits.DidYouMean': 'Search for {suggestion} instead',
    'NoHits.SearchWithoutFilters': 'Search for {query} without filters',
    'NoHits.Error': "Sorry, we're having technical issues. Please check your internet connection and try again.",
    'NoHits.ResetSearch': 'Reset Search'
  }

  translations = CRUKSearchkitNoResults.translations

  static propTypes = defaults({
    suggestionsField:React.PropTypes.string,
    errorComponent: React.PropTypes.func,
    component: React.PropTypes.func,
    noResultsLabel: React.PropTypes.object,
    noResultsTitle: React.PropTypes.string,
    noResultsBody: React.PropTypes.object,
    errorMessage: React.PropTypes.string,
    translations:SearchkitComponent.translationsPropType(
      CRUKSearchkitNoResults.translations
    )
  }, SearchkitComponent.propTypes)

  static defaultProps = {
    errorComponent: CRUKSearchkitNoResultsErrorDisplay,
    component: CRUKSearchkitNoResultsDisplay
  }

  componentWillMount(){
    super.componentWillMount()
    this.noFiltersAccessor = this.searchkit.addAccessor(
      new NoFiltersHitCountAccessor()
    )
    if(this.props.suggestionsField){
      this.suggestionsAccessor = this.searchkit.addAccessor(
        new SuggestionsAccessor(this.props.suggestionsField)
      )
    }
  }

  defineBEMBlocks() {
    let block = (this.props.mod || 'search-failed')
    return {
      container: block
    }
  }

  getSuggestion() {
    return this.suggestionsAccessor && this.suggestionsAccessor.getSuggestion()
  }

  setQueryString(query) {
    this.searchkit.getQueryAccessor().setQueryString(query, true)
    this.searchkit.performSearch(true)
  }

  resetFilters() {
    this.searchkit.getQueryAccessor().keepOnlyQueryState()
    this.searchkit.performSearch(true)
  }

  resetSearch() {
    this.searchkit.getQueryAccessor().resetState()
    this.searchkit.performSearch(true)
  }

  getFilterCount() {
    return this.noFiltersAccessor && this.noFiltersAccessor.getCount()
  }

  render() {
    if ((this.hasHits() || this.isInitialLoading() || this.isLoading()) && !this.getError()) return (<div />);

    if (this.getError()) {
      const props: NoHitsErrorDisplayProps = {
        errorLabel: this.translate('NoHits.Error'),
        errorMessage: this.props.errorMessage,
        resetSearchFn: this.resetSearch.bind(this),
        translate: this.translate,
        bemBlocks: this.bemBlocks,
        tryAgainLabel: this.translate('NoHits.ResetSearch'),
        error: this.getError()
      }

      return React.createElement(this.props.errorComponent, props);
    }

    const suggestion = this.getSuggestion();
    const query = this.getQuery().getQueryString();
    let infoKey = suggestion ? 'NoHits.NoResultsFoundDidYouMean' : 'NoHits.NoResultsFound';

    const props = {
      noResultsLabel: this.props.noResultsLabel,
      noResultsBody: this.props.noResultsBody,
      noResultsTitle: this.props.noResultsTitle,
      translate: this.translate,
      bemBlocks: this.bemBlocks,
      suggestion: suggestion,
      query: query,
      filtersCount: this.getFilterCount(),
      resetFiltersFn: this.resetFilters.bind(this),
      setSuggestionFn: this.setQueryString.bind(this, suggestion)
    }

    return React.createElement(this.props.component, props);
  }
}
