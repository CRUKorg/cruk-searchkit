import React from 'react';
import { mount } from 'enzyme';
import { SearchkitManager } from 'searchkit';
import CRUKSearchkitAlert from '../CRUKSearchkitAlert.jsx';

describe('Cruk searchkit CRUKSearchkitAlert component tests', () => {

  beforeEach(function() {
    // Reset cookie after each rendering.
    document.cookie = 'cru-hu-alert-id-1=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.searchkit = SearchkitManager.mock();
    this.createWrapper = (id, text, animation, type, dismissable, loading = false) => {
      this.searchkit.loading = loading;
      this.wrapper = mount(
        <CRUKSearchkitAlert
          searchkit={this.searchkit}
          id={id}
          type={type}
          text={text}
          animation={animation}
          dismissable={dismissable}
        />
      );
    }

    this.mockResults = () => {
      this.searchkit.setResults({
      hits:{
        total: 10,
        hits: [
          {
            _id: 1,
            _source: {
              name: 'name'
            }
          }
        ]
      }
    });
    }
  });

  it('Render with default type', function() {
    const text = <span>Warning message</span>;
    this.createWrapper('id-1', text);

    expect(this.wrapper.render().find('.cr-hu-alert--warning > .cr-hu-alert__text').text()).toBe('Warning message');
    // Do not expect a dismiss button
    expect(this.wrapper.find('.cr-hu-alert__dismiss').length).toBe(0);
  });

  it('Does not render if searchkit is loading', function() {
    const text = <span>Warning message</span>;
    this.createWrapper('id-1', text, undefined, undefined, undefined, true);
    expect(this.wrapper.find('.cr-hu-alert').length).toBe(0);
  });

  it('Removes animation after interaction with search', function() {
    const text = <span>Warning message</span>;
    this.createWrapper('id-1', text, 'bounce', 'info');
    expect(this.wrapper.render().find('.cr-hu-alert--info').hasClass('cr-animated-bounce')).toBe(true);
    this.mockResults();
    this.wrapper.update();
    expect(this.wrapper.render().find('.cr-hu-alert--info').hasClass('cr-animated-bounce')).toBe(false);
  });

  it('Render with info type, dismissable and bounce animation', function() {
    const text = <span>Info message</span>;
    this.createWrapper('id-1', text, 'bounce', 'info', true);

    // Rendered component must have the defined id as an attribute
    expect(this.wrapper.find('#id-1').length).toBe(1);
    expect(this.wrapper.render().find('.cr-hu-alert--info > .cr-hu-alert__text').text()).toBe('Info message');
    // Rendered component must have the bounce animation class.
    expect(this.wrapper.render().find('.cr-hu-alert--info').hasClass('cr-animated-bounce')).toBe(true);
    // Rendered component must not have the shake animation class
    expect(this.wrapper.render().find('.cr-hu-alert--info').hasClass('cr-animated-shake')).toBe(false);
    // The button for dismissal must exists.
    expect(this.wrapper.find('.cr-hu-alert__dismiss').length).toBe(1);
  });

  it('Click the dismiss button', function() {
    const id = 'id-1';
    const text = <span>Error message</span>
    this.createWrapper(id, text, 'shake', 'error', true);

    expect(this.wrapper.render().find('.cr-hu-alert--error > .cr-hu-alert__text').text()).toBe('Error message');
    // Rendered component must have the shake animation class.
    expect(this.wrapper.render().find('.cr-hu-alert--error').hasClass('cr-animated-shake')).toBe(true);
    const dismiss = this.wrapper.find('.cr-hu-alert__dismiss');
    // The button for dismissal must exists.
    expect(dismiss.length).toBe(1);
    // Click has not happened so the cookie should not exist and the state should not be defined.
    expect(document.cookie).not.toContain(`cru-hu-alert-${id}`);
    expect(this.wrapper.state().invisible).not.toBeDefined();
    // Simulate click button.
    dismiss.simulate('click');
    expect(document.cookie).toContain(`cru-hu-alert-${id}`);
    expect(this.wrapper.state().invisible).toBe(true);
  });
});
