import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitAutocompleteList from '../CRUKSearchkitAutocompleteList.jsx';
import { SearchkitManager } from 'searchkit';

const div = document.createElement('div');
div.id = 'searchPrototypeApp';
document.body.appendChild(div);

describe('Cruk searchkit autocomplete tests', () => {

  beforeEach(function() {

    this.searchkit = SearchkitManager.mock();
    const toggleMock = (flag) => {
      this.wrapper.setProps({ autocompleteActive: flag });
    }
    this.createWrapper = (classNames, items=['Item 1', 'Item 2'], autocompleteActive=true) => {
      this.wrapper = mount(
        <CRUKSearchkitAutocompleteList searchkit={this.searchkit}
          autocompleteItems={items}
          autocompleteActive={autocompleteActive}
          listClasses={classNames}
          toggle={toggleMock}
        />
      );
    }
    this.searchkit.accessors.accessors = [
      {
        key: 'xss-q',
        state: {
          value: ''
        }
      }
    ];
  });

  it('Render with default classes', function() {
    this.createWrapper();
    const secondListItem = this.wrapper.find('.cr-autocomplete').children().get(1);
    expect(secondListItem.innerHTML).toBe('Item 2');
    expect(secondListItem.className).toBe('cr-autocomplete__list-item');
  });

  it('Render with specific classes', function() {
    // Define classes that will go into the ul tag and its items.
    const classes = ['custom-class1', 'custom-class2'];
    const items = ['List item 1', 'List item 2', 'List item 3'];
    // Mount the component.
    this.createWrapper(classes, items);
    const autoComplete = this.wrapper.find('.custom-class1');
    // Check to see if the second class is present
    expect(autoComplete.hasClass('custom-class2')).toBe(true);
    // Check the number the children
    expect(autoComplete.children().length).toBe(3);
    // Child shoud have bem generated classname of first class in the listClasses prop.
    expect(autoComplete.children().get(1).className).toBe('custom-class1__list-item');
  });

  it('Hide/Show autocomplete depending on the autocompleteActive prop', function() {
    this.createWrapper();
    // Component is mounted and rendered.
    expect(this.wrapper.find('.cr-autocomplete').length).toBe(1);
    // Set autocompleteActive prop to false.
    this.wrapper.setProps({ autocompleteActive: false });
    // The component should not be rendered.
    expect(this.wrapper.find('.cr-autocomplete').length).toBe(0);
  });

  it('Hide/Show autocomplete depending on the autocompleteItems prop', function() {
    this.createWrapper();
    // Component is mounted and rendered.
    expect(this.wrapper.find('.cr-autocomplete').length).toBe(1);
    // Empty array for autocompleteItems prop.
    this.wrapper.setProps({ autocompleteItems: [] });
    // The component should not be rendered.
    expect(this.wrapper.find('.cr-autocomplete').length).toBe(0);
  });

  it('Click on an autocomplete list item', function() {
    this.createWrapper();
    // Fake QueryAccessor should have empty state.value.
    expect(this.searchkit.accessors.accessors[0].state.value).toBe('');
    // Autocomplete list should be visible.
    expect(this.wrapper.find('.cr-autocomplete').length).toBe(1);
    // Select second item from the autocomplete.
    this.wrapper.find('.cr-autocomplete').childAt(1).simulate('click');
    // Accessor value should be equal 'Item 2'.
    expect(this.searchkit.accessors.accessors[0].state.value).toBe('Item 2');
    // Autocomplete list should not be visible.
    expect(this.wrapper.find('.cr-autocomplete').length).toBe(0);
  });
});
