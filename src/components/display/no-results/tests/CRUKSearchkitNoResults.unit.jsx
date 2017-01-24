import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitNoResults from '../CRUKSearchkitNoResults.jsx';
import { 
  SearchkitManager,
  ImmutableQuery
} from 'searchkit';

describe('CRUKSearchkitNoResults tests', () => {

  beforeEach(function() {
    this.searchkit = SearchkitManager.mock();
    this.searchkit.initialLoading = false;
    this.createWrapper = (error=false, noResultsTitle, errorMessage, noResultsBody) => {
      this.searchkit.error = error;
      this.wrapper = mount(
        <CRUKSearchkitNoResults
          searchkit={this.searchkit}
          noResultsTitle={noResultsTitle}
          errorMessage={errorMessage}
          noResultsBody={noResultsBody}
          translations={{
            'NoHits.DidYouMean': 'Search for {suggestion}',
            'NoHits.SearchWithoutFilters': 'Search for {query} without filters'
          }}
        />
      );
    }

    this.setQuery = (qstr) => {
      this.searchkit.query = new ImmutableQuery()
      this.searchkit.query.index.queryString = qstr;
    };
  });

  it('Renders no results display', function() {
    this.createWrapper();
    const wrapper = this.wrapper.render().find('.search-failed');
    // The component should have rendered with the correct wrapper class.
    expect(wrapper.length).toBe(1);
    // The correct elements should exist.
    expect(wrapper.find('.search-failed__info > .no-results__heading').length).toBe(1);
  });

  it('Renders no results with noResultsTitle prop', function() {
    this.createWrapper(false, 'Sorry mate');
    const wrapper = this.wrapper.render().find('.search-failed');
    // The correct elements should exist.
    expect(wrapper.find('.search-failed__info > .no-results__heading').text()).toBe('Sorry mate');
  });

  it('Renders no results with noResultsBody prop', function() {
    const body = <section className="custom-body">Body</section>;
    this.createWrapper(false, 'Sorry mate', undefined, body);
    const wrapper = this.wrapper.render().find('.search-failed');
    // Find the up defined element with its text.
    expect(wrapper.find('section.custom-body').text()).toBe('Body');
  });

  it('Renders no results display with search value', function() {
    this.setQuery('Cancer');
    this.createWrapper();
    const wrapper = this.wrapper.render().find('.search-failed');
    // The query text should be present.
    expect(wrapper.find('.search-failed__info > .no-results__heading').text()).toContain('Cancer');
  });

  it('Renders error display with reset button', function() {
    this.createWrapper(true);
    const wrapper = this.wrapper.render().find('.search-failed');
    // The component should have rendered with the correct wrapper class.
    expect(wrapper.length).toBe(1);
    // Search for reset button.
    expect(wrapper.find('.search-failed__step-action').text()).toContain('Reset Search');
  });

  it('Renders error display with correct errorMessage', function() {
    this.createWrapper(true, undefined, 'ERROR ERROR');
    const wrapper = this.wrapper.render().find('.search-failed');
    // Search for reset button.
    expect(wrapper.find('.search-failed__info').text()).toBe('ERROR ERROR');
  });
});
