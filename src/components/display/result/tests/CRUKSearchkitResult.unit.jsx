import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitResult from '../CRUKSearchkitResult.jsx';
import { 
  SearchkitManager
} from 'searchkit';

describe('CRUKSearchkitResult tests', () => {

  beforeEach(function() {
    this.searchkit = SearchkitManager.mock();
    this.createWrapper = (result) => {
      this.wrapper = mount(
        <CRUKSearchkitResult
          result={result}
          searchkit={this.searchkit}
        />
      );
    }
  });

  it('Renders with correct classes and values', function() {
    const result = {
      _source: {
        url: 'http://madeup.com',
        title: 'Mocking a title',
        description: 'Some descriptive text that does not exist'
      }
    }
    this.createWrapper(result);
    const wrapper = this.wrapper.render().find('.cr-search-result');
    // Check to see if the component is rendered.
    expect(wrapper.length).toBe(1);
    // Check title.
    expect(wrapper.find('.cr-search-result__title').text()).toBe('Mocking a title');
    // Check link.
    expect(wrapper.find('.cr-search-result__link').attr('href')).toBe('http://madeup.com');
    // Check description.
    expect(wrapper.find('.cr-search-result__excerpt').text()).toBe('Some descriptive text that does not exist');
  });

  it('Renders component with sanitized values', function() {
    const result = {
      _source: {
        url: 'http://madeup.com',
        title: 'Mocking a <strong>title</strong>',
        description: 'Some <strong>descriptive</strong> <div>text</div> that does <a>not exist</a>'
      }
    }
    this.createWrapper(result);
    const wrapper = this.wrapper.render().find('.cr-search-result');
    // Check if title is sanitized.
    expect(wrapper.find('.cr-search-result__title > .cr-search-result__link').html()).toBe('Mocking a title');
    // Check if description is sanitized(only allows strong tag).
    expect(wrapper.find('.cr-search-result__excerpt').html()).toBe('Some <strong>descriptive</strong> text that does not exist');
  });
});
