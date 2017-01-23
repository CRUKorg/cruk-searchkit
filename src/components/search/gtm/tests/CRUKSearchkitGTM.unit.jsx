import React from 'react';
import { mount } from 'enzyme';
import { SearchkitManager } from 'searchkit';
import CRUKSearchkitGTM from '../CRUKSearchkitGTM';

window.dataLayer = {};

describe('CRUKSearchkitGTM tests', () => {

   beforeEach(function() {

    this.searchkit = SearchkitManager.mock();
    spyOn(this.searchkit, 'performSearch');

    this.createWrapper = (scriptId) => {
      this.wrapper = mount(
        <CRUKSearchkitGTM
          searchkit={this.searchkit}
          gtmId="GT-custom"
          searchName="RFL event search"
          scriptId={scriptId}
        />
      );
    }
  });

  it('Renders noscript iframe', function() {
    this.createWrapper();
    expect(this.wrapper.childAt(0).text()).toContain('</iframe>');
    expect(this.wrapper.childAt(0).text()).toContain('www.googletagmanager.com');
  });

  it('Renders normal js', function() {
    this.createWrapper('custom-script-id');
    expect(this.wrapper.render().find('#custom-script-id').text()).toContain('GT-custom');
    expect(this.wrapper.render().find('#custom-script-id').text()).toContain('www.googletagmanager.com');
  });
});
