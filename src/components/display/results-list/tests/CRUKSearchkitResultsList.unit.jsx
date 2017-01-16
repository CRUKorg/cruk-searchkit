import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitResultsList from '../CRUKSearchkitResultsList.jsx';
import { 
  SearchkitManager
} from 'searchkit';

describe('CRUKSearchkitResultsList tests', () => {

  beforeEach(function() {
    this.searchkit = SearchkitManager.mock();
    this.createWrapper = (mod, className) => {
      this.wrapper = mount(
        <CRUKSearchkitResultsList
          mod={mod}
          className={className}
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
          total: 9,
          hits: hits
        }
      }
      this.searchkit.setResults(results);
    }
  });

  it('Renders with correct wrapper markup and class', function() {
    this.mockResults();
    this.createWrapper('custom-class-wrapper');
    const wrapper = this.wrapper.render().find('.custom-class-wrapper');
    // Check to see if wrapper with the correct classes has been rendered.
    expect(wrapper.length).toBe(1);
  });

  it('Renders correct number of results', function() {
    this.mockResults();
    this.createWrapper();
    const wrapper = this.wrapper.render().find('.cr-search-result');
    // Check to see if wrapper with the correct classes has been rendered.
    expect(wrapper.length).toBe(9);
    // Now mock 4 results.
    this.mockResults('1234');
    expect(this.wrapper.render().find('.cr-search-result').length).toBe(4);
  });
});
