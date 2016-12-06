import React from 'react';
import { mount } from 'enzyme';
import { SearchkitManager } from 'searchkit';
import CRUKSearchkitAlert from '../CRUKSearchkitAlert.jsx';

describe('Cruk searchkit CRUKSearchkitAlert component tests', () => {

  beforeEach(function() {
    this.searchkit = SearchkitManager.mock();
    this.createWrapper = (helptext) => {
      this.wrapper = mount(
        <CRUKSearchkitAlert
          searchkit={this.searchkit}
          helptext={helptext}
        />
      );
    }
  });

  it('Render with default help text', function() {
    this.createWrapper();
    expect(this.wrapper.find('h2').text()).toBe('Please enter a keyword in the text box to start searching.');
  });

  it('Render with custom help text', function() {
    const helpJsx = <h1 className="crazy-class">
        This is <strong>custom help text</strong>
      </h1>;
    this.createWrapper(helpJsx);
    expect(this.wrapper.render().find('.crazy-class > strong').text()).toBe('custom help text');
  });
});
