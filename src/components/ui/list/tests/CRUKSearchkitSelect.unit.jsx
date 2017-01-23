import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitSelect from '../CRUKSearchkitSelect.jsx';
import { 
  SearchkitManager,
  ImmutableQuery
} from 'searchkit';

describe('CRUKSearchkitSummary tests', () => {

  beforeEach(function() {
    const defaultItems = [
      {key:"a", label:"A"},
      {key:"b", label:"B", doc_count:11, disabled:true},
      {key:"c", title:"C", doc_count:12},
      {key:"d", doc_count:15},
    ];
    this.searchkit = SearchkitManager.mock();
    this.createWrapper = (items = defaultItems) => {
      const selectedItems = [
        {key:"a", label:"A"}
      ];
      this.wrapper = mount(
        <CRUKSearchkitSelect selectedItems={selectedItems} items={items} />
      );
    }
  });

  it('Renders with correct items and classes', function() {
    this.createWrapper();
    const list = this.wrapper.find('.form-control');
    // Check that the correct list items have been rendered.
    expect(list.type()).toBe('select');
    expect(list.childAt(0).text()).toBe('A');
    expect(list.childAt(1).text()).toBe('B (11)');
    expect(list.childAt(1).node.value).toBe('b');
    expect(list.childAt(1).node.disabled).toBe(true);
    expect(list.children().length).toBe(4);
  });
});
