import React from 'react';
import { mount } from 'enzyme';
import { SearchkitManager } from 'searchkit';
import CRUKSearchkitAlert from '../CRUKSearchkitAlert.jsx';

describe('Cruk searchkit CRUKSearchkitAlert component tests', () => {

  beforeEach(function() {
    this.searchkit = SearchkitManager.mock();
    this.createWrapper = (text, animation, type, dismissable) => {
      this.wrapper = mount(
        <CRUKSearchkitAlert
          type={this.searchkit}
          text={helptext}
          animation={helptext}
          dismissable={helptext}
        />
      );
    }
  });

  it('Render with default help text', function() {
    this.createWrapper();
    expect(this.wrapper.find('h2')).toBe('Please enter a keyword in the text box to start searching.');
  });
});
