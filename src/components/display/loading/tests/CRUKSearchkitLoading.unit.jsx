import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitLoading from '../CRUKSearchkitLoading.jsx';
import { 
  SearchkitManager
} from 'searchkit';

describe('Cruk searchkit searchbox tests', () => {

  beforeEach(function() {
    this.searchkit = SearchkitManager.mock();
    this.createWrapper = (loading = true) => {
      this.searchkit.loading = loading;
      this.wrapper = mount(
        <CRUKSearchkitLoading searchkit={this.searchkit} />
      );
    }
  });

  it('Renders with correct classes', function() {
    this.createWrapper();
    const wrapper = this.wrapper.render().find('.cr-simple-loader');
    // Markup needs to have the correct classes and elements in correct order.
    expect(wrapper.length).toBe(1);
    // Second spinner item needs to have the correct bounce class.
    expect(
      wrapper
      .find('.cr-simple-loader__spinner-item').eq(1)
      .hasClass('cr-simple-loader__spinner-item--bounce2'))
    .toEqual(true);
  });

  it('Does not render if searchkit is loading', function() {
    this.createWrapper(false);
    const wrapper = this.wrapper.render().find('.cr-simple-loader');
    // Component should have not rendered.
    expect(wrapper.length).toBe(0);
  });
});
