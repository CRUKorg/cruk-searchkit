import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitSummary from '../CRUKSearchkitSummary.jsx';
import { 
  SearchkitManager,
  ImmutableQuery
} from 'searchkit';

describe('CRUKSearchkitSummary tests', () => {

  beforeEach(function() {
    this.searchkit = SearchkitManager.mock();
    this.createWrapper = () => {
      this.wrapper = mount(
        <CRUKSearchkitSummary
          searchkit={this.searchkit}
        />
      );
    }

    this.mockResults = (numberOfResults = '123456789') => {
      const hits = numberOfResults.split('').map((x,i) => {
        const counter = i + 1;
        return {
          _id: counter,
          _source: {
            url: `http://madeup.com/${counter}`,
            title: `Mocking a title #${counter}`,
            description: `Some descriptive text that does not exist #${counter}`
          }
        }
      });
      const results = {
        hits: {
          total: numberOfResults.length,
          hits: hits
        }
      }
      this.searchkit.setResults(results);
    }

    this.setQuery = (qstr='cancer') => {
      this.searchkit.query = new ImmutableQuery()
      this.searchkit.query.index.queryString = qstr;
    };
  });

  it('Renders with correct wrapper markup and class', function() {
    this.mockResults();
    this.setQuery();
    this.createWrapper();
    const wrapper = this.wrapper.render().find('.cr-search-summary');
    // Check to see if wrapper with the correct classes has been rendered.
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.cr-search-summary__info').length).toBe(1);
  });

  it('Renders correct text', function() {
    this.mockResults();
    this.setQuery();
    this.createWrapper();
    const wrapper = this.wrapper.render().find('.cr-search-summary__info');
    // Check to see if summary is rendered with the correct text.
    expect(wrapper.html()).toBe('9 search results for <strong>cancer</strong>');
    // Set different queryString ad mock different results.
    this.setQuery('bone cancer');
    this.mockResults('1234');
    this.wrapper.update();
    // Expecting different text.
    expect(
      this.wrapper.render().find('.cr-search-summary__info').html()
    ).toBe('4 search results for <strong>bone cancer</strong>');
  });
});
