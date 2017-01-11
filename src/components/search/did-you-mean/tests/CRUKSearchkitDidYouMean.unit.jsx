import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitDidYouMean from '../CRUKSearchkitDidYouMean.jsx';
import { SearchkitManager } from 'searchkit';

describe('CRUKSearchkitDidYouMean tests', () => {

  beforeEach(function() {

    this.searchkit = SearchkitManager.mock();
    spyOn(this.searchkit, 'performSearch');

    this.createWrapper = (field = 'body', minResults = 10) => {
      this.wrapper = mount(
        <CRUKSearchkitDidYouMean searchkit={this.searchkit}
          field={field}
          minResults={minResults}
        />
      );
    }

    this.mockSuggestions = (value = 'cancer bone', totalResults = 0) => {
      this.searchkit.setResults({
        hits:{ total: totalResults },
        suggest: {
          suggestions: [
            {
              options: [
                {
                  text: value
                }
              ]
            }
          ]
        }
      });

      // Mock the searchbox accessor.
      const accessor = {
        key: 'xss-q',
        state: {
          value: ''
        }
      }
      this.searchkit.accessors.accessors.push(accessor);
    }

    
  });

  it('Renders correctly', function() {
    this.createWrapper();
    expect(this.wrapper.find('.cr-did-you-mean').length).toBe(0);
    this.mockSuggestions();
    expect(this.wrapper.find('.cr-did-you-mean').text()).toEqual('Did you mean cancer bone?');
  });

  it('Does not render if more than 10 results', function() {
    this.createWrapper();
    this.mockSuggestions('bone cancer', 11);
    // Did you mena component should not render.
    expect(this.wrapper.find('.cr-did-you-mean').length).toBe(0);
  });

  it('Click on the link after render', function() {
    this.createWrapper();
    this.mockSuggestions('dry laundry');
    const link = this.wrapper.find('.cr-did-you-mean__link');
    expect(link.text()).toEqual('dry laundry');
    // QueryAccessor should have empty state.
    expect(this.searchkit.accessors.accessors[1].state.value).toEqual('');
    // Simulate click.
    link.simulate('click');
    // Searchkit should have preformed a search after the click.
    expect(this.searchkit.performSearch).toHaveBeenCalled();
    // QueryAccessor should have changed the state.
    expect(this.searchkit.accessors.accessors[1].state.value).toEqual('dry laundry');
  });
});
