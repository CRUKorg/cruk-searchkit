import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitSearchBox from '../CRUKSearchkitSearchBox.jsx';
import { 
  SearchkitManager, 
  MultiMatchQuery 
} from 'searchkit';

describe('Cruk searchkit searchbox tests', () => {

  beforeEach(function() {

    this.searchkit = SearchkitManager.mock();

    this.createWrapper = (blurAction='none') => {
      this.wrapper = mount(
        <CRUKSearchkitSearchBox
          searchkit={this.searchkit}
          id="xss-q"
          queryBuilder={MultiMatchQuery}
          queryOptions={{
            analyzer: 'cruk_standard'
          }}
          queryFields={['title', 'description']}
          placeholder="Search..."
        />
      );
    };

    this.searchkit.accessors.accessors = [
      {
        key: 'xss-q',
        state: {
          value: ''
        }
      }
    ];
  });

  it('Renders with correct classes', function() {
    this.createWrapper();
    const wrapper = this.wrapper.render().find('.cr-input-group.cr-input-group--lg.cr-search-input');
    // Top level div container needs to have the correct classes.
    expect(wrapper.length).toBe(1);
    // The input is within the div with the correct class.
    expect(wrapper.children('input').hasClass('cr-input-group__input')).toEqual(true);
  });

  it('Renders with focused state', function() {
    this.createWrapper();
    // Wrapper does not have the --focused class.
    expect(this.wrapper.render().find('.cr-search-input').hasClass('cr-input-group--focused')).toEqual(false);
    // Set the state to focused and check for --focused class.
    this.wrapper.setState({ focused: true });
    expect(this.wrapper.render().find('.cr-search-input').hasClass('cr-input-group--focused')).toEqual(true);
  });

  it('Renders with custom placeholder prop', function() {
    this.createWrapper();
    // Input has default placeholder.
    expect(this.wrapper.render().find('.cr-search-input__input').attr('placeholder')).toEqual('Search...');
    // Set the prop to custom text and check for placeholder.
    this.wrapper.setProps({ placeholder: 'Custom search...' });
    expect(this.wrapper.render().find('.cr-search-input__input').attr('placeholder')).toEqual('Custom search...');
  });

  it('Has the search looking glass icon', function() {
    this.createWrapper();
    const button = this.wrapper.render().find('.cr-search-input__button');
    expect(button.find('.cr-input-group__icon').length).toBe(1);
  });
});
