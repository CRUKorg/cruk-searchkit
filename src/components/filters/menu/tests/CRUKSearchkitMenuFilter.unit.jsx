import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitMenuFilter from '../CRUKSearchkitMenuFilter.jsx';
import CRUKSearchkitSelect from '../../../ui/list/CRUKSearchkitSelect.jsx';
import { SearchkitManager, ImmutableQuery, Utils } from 'searchkit';

describe('Cruk searchkit location input tests', () => {

  beforeEach(function() {
    Utils.guidCounter = 0;
    this.searchkit = SearchkitManager.mock();
    spyOn(this.searchkit, 'performSearch');

    this.wrapper = mount(
      <CRUKSearchkitMenuFilter
        searchkit={this.searchkit}
        listComponent={CRUKSearchkitSelect}
        translations={{"Red":"Red Translated"}}
        field="color" title="Color" orderKey="_term" orderDirection="asc"
        include="title" exclude={["n/a"]}
        id="color" size={10}/>
    );

    this.getOptionAt = (at)=> {
      return this.wrapper.find("select.form-control")
        .children().at(at)
    }

    this.accessor = this.searchkit.accessors.accessors[0];
    this.searchkit.setResults({
      aggregations:{
        color1:{
          color:{
            buckets:[
              {key:"Red", doc_count:10},
              {key:"Blue", doc_count:11},
              {key:"Green", doc_count:12}
            ]
          },
          doc_count:33
        }
      }
    });
  });

  it('Renders with correct markup and classes', function() {
    // Expect the correct classes to be rendered.
    expect(this.wrapper.render().find('.sk-panel > div').hasClass('sk-panel__header')).toBe(true);
    expect(this.wrapper.render().find('select').hasClass('form-control')).toBe(true);
  });

  it('Renders with correct items', function() {
    // Expect the correct itmes to be rendered with correct text and values.
    expect(this.wrapper.render().find('select').children().length).toBe(4);
    expect(this.getOptionAt(2).text()).toBe('Blue (11)');
    expect(this.wrapper.render().find('option').eq(2).val()).toBe('Blue');
    expect(this.getOptionAt(0).text()).toBe('All (33)');
    expect(this.wrapper.render().find('option').eq(0).val()).toBe('$all');
  });

  it('OptionsOrder prop for ordering working correctly', function() {
    // Expect items to be rendered in the correct order.
    expect(this.getOptionAt(2).text()).toBe('Blue (11)');
    expect(this.getOptionAt(3).text()).toBe('Green (12)');
    expect(this.getOptionAt(1).text()).toBe('Red Translated (10)');
    // Set the optionsOrder Property.
    this.wrapper.setProps({ optionsOrder: [
      'Green',
      'Blue',
      'Red'
    ]});
    // Recheck the order of items if not PhantomJS.
    if (!/PhantomJS/.test(window.navigator.userAgent)) {
      expect(this.getOptionAt(2).text()).toBe('Blue (11)');
      expect(this.getOptionAt(3).text()).toBe('Red Translated (10)');
      expect(this.getOptionAt(1).text()).toBe('Green (12)');
    }
  });
});
