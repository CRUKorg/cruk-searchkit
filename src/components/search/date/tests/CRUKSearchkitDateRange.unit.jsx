import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import CRUKSearchkitDateRange from '../CRUKSearchkitDateRange.jsx';
import { SearchkitManager } from 'searchkit';

describe('CRUKSearchkitDateRange tests', () => {
  if (/PhantomJS/.test(window.navigator.userAgent)) {
    it('Renders for PhantomJS', function() {
      expect(true).toBe(true);
    });
    return;
  }

  beforeEach(function() {

    this.searchkit = SearchkitManager.mock();
    spyOn(this.searchkit, 'performSearch');

    this.createWrapper = (showClearDates = true) => {
      this.wrapper = mount(
        <CRUKSearchkitDateRange
          searchkit={this.searchkit}
          field="date_start"
          id="date"
          title="Title"
          showClearDates={showClearDates}
        />
      );
      this.accessor = this.searchkit.accessors.getAccessors()[0];
    }
  });

  it('Renders correctly', function() {
    this.createWrapper();
    // Has all relevant classes and fields.
    expect(document.body.innerHTML).toContain('<div class="DateRangePicker__tether--invisible DateRangePicker__tether-element ');
    expect(this.wrapper.hasClass('cr-daterange-wrapper')).toBe(true);
    expect(this.wrapper.childAt(0).hasClass('DateRangePicker')).toBe(true);
    expect(this.wrapper.find('input#startDate').length).toBe(1);
    expect(this.wrapper.find('input#endDate').length).toBe(1);
  });

  it('Opens datepicker after clicking start date', function() {
    this.createWrapper();
    // Some classes should not exist before click.
    expect(this.wrapper.hasClass('cr-daterange-wrapper--focused')).toBe(false);
    expect(document.body.innerHTML).not.toContain('<div class="DateRangePicker__tether--show DateRangePicker__tether-element ');
    expect(this.wrapper.render().find('input#startDate').next().hasClass('DateInput__display-text--focused')).toBe(false);

    // Simulate click and re-check the classes.
    this.wrapper.find('input#startDate').simulate('click');
    expect(this.wrapper.hasClass('cr-daterange-wrapper--focused')).toBe(true);
    expect(document.body.innerHTML).toContain('<div class="DateRangePicker__tether--show DateRangePicker__tether-element ');
    expect(this.wrapper.render().find('input#startDate').next().hasClass('DateInput__display-text--focused')).toBe(true);
  });

  it('Changing state changes startdate input value', function() {
    this.createWrapper();
    expect(this.wrapper.render().find('input#startDate').val()).toBe('');
    this.wrapper.setState({ startDate: moment('2016-08-16') });
    expect(this.wrapper.render().find('input#startDate').val()).toBe('16/08/2016');
  });

  it('Changing state changes enddate input value', function() {
    this.createWrapper();
    expect(this.wrapper.render().find('input#endDate').val()).toBe('');
    this.wrapper.setState({ endDate: moment('2016-12-16') });
    expect(this.wrapper.render().find('input#endDate').val()).toBe('16/12/2016');
  });

  it('Selecting date renders closer X', function() {
    this.createWrapper();
    expect(this.wrapper.render().find('.DateRangePickerInput__clear-dates').hasClass('DateRangePickerInput__clear-dates--hide')).toBe(true);
    expect(this.wrapper.render().find('input#endDate').val()).toBe('');
    this.wrapper.setState({ endDate: moment('2016-12-16') });
    expect(this.wrapper.render().find('.DateRangePickerInput__clear-dates').hasClass('DateRangePickerInput__clear-dates--hide')).toBe(false);
    expect(this.wrapper.render().find('input#endDate').val()).toBe('16/12/2016');
  });

  it('Clicking closer X clears dates', function() {
    this.createWrapper();
    this.wrapper.setState({ endDate: moment('2016-12-16') });
    expect(this.wrapper.render().find('input#endDate').val()).toBe('16/12/2016');
    this.wrapper.find('.DateRangePickerInput__clear-dates').simulate('click');
    expect(this.wrapper.render().find('input#endDate').val()).toBe('');
  });

  it('Selecting both dates performs search and updates accessor', function() {
    this.createWrapper();
    // Change start date input.
    this.wrapper.find('input#startDate').get(0).value = '12/12/2016';
    this.wrapper.find('input#startDate').simulate('change');
    // performSearch has not been performened yet and accessor state has empty value.
    expect(this.searchkit.performSearch).not.toHaveBeenCalled();
    expect(this.accessor.state.value).toEqual({});
    // Change End date input.
    this.wrapper.find('input#endDate').get(0).value = '16/12/2016';
    this.wrapper.find('input#endDate').simulate('change');
    // Accessor state has value and performSearch has been called.
    expect(this.accessor.state.value.min).toBe('2016-12-12');
    expect(this.accessor.state.value.max).toBe('2016-12-16');
    expect(this.searchkit.performSearch).toHaveBeenCalled();
  });

  it('Clearing both dates performs search and updates accessor', function() {
    this.createWrapper();
    // Change start date input and enddate input.
    this.wrapper.find('input#startDate').get(0).value = '12/12/2016';
    this.wrapper.find('input#startDate').simulate('change');
    this.wrapper.find('input#endDate').get(0).value = '16/12/2016';
    this.wrapper.find('input#endDate').simulate('change');
    // Accessor state has value and performSearch has been called.
    expect(this.accessor.state.value.min).toBe('2016-12-12');
    expect(this.accessor.state.value.max).toBe('2016-12-16');
    expect(this.searchkit.performSearch).toHaveBeenCalled();
    expect(this.searchkit.performSearch.calls.count()).toBe(1);
    // Clear inputs clicking closer X
    this.wrapper.find('.DateRangePickerInput__clear-dates').simulate('click');
    // Accessor state has no value and performed search has been called twice.
    expect(this.accessor.state.value).toEqual(null);
    expect(this.searchkit.performSearch.calls.count()).toBe(2);
  });

});
