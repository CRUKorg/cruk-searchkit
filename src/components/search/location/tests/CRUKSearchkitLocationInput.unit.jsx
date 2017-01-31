import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitLocationInput from '../CRUKSearchkitLocationInput.jsx';
import { SearchkitManager } from 'searchkit';
import googleStub from './google_helper/google_stub';

window.google = global.google = googleStub();

describe('Cruk searchkit location input tests', () => {

  beforeEach(function() {

    this.searchkit = SearchkitManager.mock();
    spyOn(this.searchkit, 'performSearch');

    this.createWrapper = (placeholder='Enter location', country='GB', resultRadius='80km') => {
      this.wrapper = mount(
        <CRUKSearchkitLocationInput 
          searchkit={this.searchkit}
          queryDelay={0}
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

  it('Renders properly with correct classes', function() {
    this.createWrapper();
    expect(this.wrapper
      .render()
      .find('.form-group > .geosuggest > .geosuggest__input-wrapper > .geosuggest__input')
      .attr('placeholder')).toBe('Enter location');
  });

  it('Should type in a value', function() {
    this.createWrapper();
    this.typeLocation('London');
    expect(this.wrapper.find('.geosuggest__input').get(0).value).toBe('London');
  });

  it('Should give suggestion when typing', function() {
    this.createWrapper();
    expect(this.wrapper.find('.geosuggest-item').length).toBe(0);
    this.typeLocation('New York');
    expect(this.wrapper.find('.geosuggest-item').length).not.toBe(0);
  });

  it('Should have correct classes when there are results', function() {
    this.createWrapper();
    expect(this.wrapper.hasClass('cr-geosuggest-wrapper--dropdown')).toBe(false);
    expect(this.wrapper.find('.geosuggest__suggests').hasClass('geosuggest__suggests--hidden')).toBe(true);
    this.typeLocation('New York');
    expect(this.wrapper.hasClass('cr-geosuggest-wrapper--dropdown')).toBe(true);
    expect(this.wrapper.find('.geosuggest__suggests').hasClass('geosuggest__suggests--hidden')).toBe(false);
  });
});
