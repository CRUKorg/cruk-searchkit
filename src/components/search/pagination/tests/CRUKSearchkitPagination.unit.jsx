import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitPagination from '../CRUKSearchkitPagination.jsx';
import { 
  SearchkitManager,
  ImmutableQuery
} from 'searchkit';

describe('CRUKSearchkitSummary tests', () => {

  beforeEach(function() {
    this.searchkit = SearchkitManager.mock();
    this.createWrapper = (showNumbers = false, pageScope = 3, props = {}) => {
      this.wrapper = mount(
        <CRUKSearchkitPagination
          searchkit={this.searchkit}
          showNumbers={showNumbers}
          pageScope={pageScope}
          {...props}
        />
      );
      this.accessor = this.searchkit.accessors.statefulAccessors["p"];
    }

    this.searchkit.query = new ImmutableQuery().setSize(10)


    this.searchkit.setResults({
      hits:{
        total:81
      }
    })

  });

  it('Renders correctly', function() {
    this.createWrapper();
    const pager = this.wrapper.render().find('.cr-simple-pager');
    // Check if the component has been rendered.
    expect(pager.length).toBe(1);
    // Check if the first item is disabled.
    expect(pager.children().eq(0).hasClass('disabled')).toBe(true);
    // Check if the text in the middle is correct
    expect(pager.children().eq(1).find('.cr-simple-pager__indicator').text()).toBe('Page 1 of 9');
  });

  it('Changes when page accessor updates', function() {
    this.createWrapper();
    // Update accessor state.
    this.accessor.state = this.accessor.state.setValue(4)
    this.wrapper.update()
    expect(this.wrapper
      .render()
      .find('.cr-simple-pager')
      .children()
      .eq(1)
      .find('.cr-simple-pager__indicator')
      .text()).toBe('Page 4 of 9');
  });

  it('Has next disabled if last page', function() {
    this.createWrapper();
    // Update accessor state.
    this.accessor.state = this.accessor.state.setValue(9);
    this.wrapper.update();
    expect(this.wrapper
      .render()
      .find('.cr-simple-pager')
      .children()
      .eq(1)
      .find('.cr-simple-pager__indicator')
      .text()).toBe('Page 9 of 9');

    // Next button should not be present.
    expect(this.wrapper.find('.cr-simple-pager__next > .cr-simple-pager__link').length).toBe(0);
  });
});
