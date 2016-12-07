import React from 'react';
import { mount } from 'enzyme';
import { SearchkitManager } from 'searchkit';
import CRUKSearchkitAlert from '../CRUKSearchkitAlert.jsx';

describe('Cruk searchkit CRUKSearchkitAlert component tests', () => {

  beforeEach(function() {
    this.searchkit = SearchkitManager.mock();
    this.createWrapper = (id, text, animation, type, dismissable) => {
      this.wrapper = mount(
        <CRUKSearchkitAlert
          id={id}
          type={type}
          text={text}
          animation={animation}
          dismissable={dismissable}
        />
      );
    }
  });

  it('Render with default type', function() {
    this.createWrapper('id-1', 'Warning message');

    expect(this.wrapper.render().find('.cr-hu-alert--warning > .cr-hu-alert__text').text()).toBe('Warning message');
    // Do not expect a dismiss button
    expect(this.wrapper.find('.cr-hu-alert__dismiss').length).toBe(0);
  });

  it('Render with info type, dismissable and bounce animation', function() {
    this.createWrapper('id-1', 'Info message', 'bounce', 'info', true);

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
    this.createWrapper(id, 'Error message', 'shake', 'error', true);

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
