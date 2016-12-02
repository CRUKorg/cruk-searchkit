import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitLocationInput from '../CRUKSearchkitLocationInput.jsx';
import { SearchkitManager } from 'searchkit';

describe('Cruk searchkit location input tests', () => {

  beforeEach(function() {

    this.searchkit = SearchkitManager.mock();
    spyOn(this.searchkit, 'performSearch');

    this.createWrapper = (placeholder='Enter location', country='GB', resultRadius='80km') => {
      this.wrapper = mount(
        <CRUKSearchkitLocationInput searchkit={this.searchkit}
          field='location'
          title=''
          id='loc'
          placeholder={placeholder}
          country={country}
          resultRadius={resultRadius}
        />
      );
      this.accessor = this.searchkit.accessors.getAccessors()[0];
    }

    this.typeLocation = (value) => {
      const input = this.wrapper.find('.geosuggest__input');
      input.get(0).value = value;
      input.simulate('change');
    }

  });

  it('render', function() {
    this.createWrapper();
    expect(this.wrapper.find('.geosuggest__input').get(0).placeholder).toBe('Enter location');
  });

  it('Type in a location', function() {
    this.createWrapper();
    this.typeLocation('London Bridge');
    expect(this.wrapper.find('.geosuggest__input').get(0).value).toBe('London Bridge');
  });
});
