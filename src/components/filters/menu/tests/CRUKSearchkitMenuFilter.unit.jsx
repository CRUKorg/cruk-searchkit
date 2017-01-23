import React from 'react';
import { mount } from 'enzyme';
import CRUKSearchkitMenuFilter from '../CRUKSearchkitMenuFilter.jsx';
import CRUKSearchkitSelect from '../../../ui/list/CRUKSearchkitSelect.jsx';
import { SearchkitManager, ImmutableQuery } from 'searchkit';

describe('Cruk searchkit location input tests', () => {

  beforeEach(function() {

    this.searchkit = SearchkitManager.mock();
    spyOn(this.searchkit, 'performSearch');

    this.createWrapper = () => {
      this.wrapper = mount(
        <CRUKSearchkitMenuFilter
          searchkit={this.searchkit}
          field="event_type"
          title=""
          id="event_type"
          listComponent={CRUKSearchkitSelect}
          translations={{ All: 'All types' }}
        />
      );
      this.accessor = this.searchkit.accessors.getAccessors()[0];
      this.searchkit.query = new ImmutableQuery();
    }

    this.mockResults = (numberOfResults = '123456789') => {
      this.searchkit.query.query = {
        aggs: {
          event_type10: {
            aggs: {
              event_type: {
                terms: {
                  field: 'event_type'
                }
              }
            }
          }
        }
      }

      const types = numberOfResults.split('').map((x,i) => {
        return { doc_count: 210, key: `Type ${i+1}`}
      });

      const hits = numberOfResults.split('').map((x,i) => {
        const counter = i + 1;
        return {
          _id: counter,
          _source: {
            url: `http://madeup.com/${counter}`,
            title: `Mocking a title #${counter}`,
            description: `Some descriptive text that does not exist #${counter}`,
            event_type: types[parseInt((Math.random() * 10))]
          }
        }
      });
      const results = {
        aggregations: {
          event_type10: {
            doc_count: types.length * 10,
            event_type: {
              buckets: types,
              doc_count_error_upper_bound: 0,
              sum_other_doc_count: 0
            },
            event_type_count: {
              value: types.length
            } 
          }
        },
        hits: {
          total: types.length,
          hits: hits
        }
      }
      this.searchkit.setResults(results);
    }
  });

  it('render', function() {
    this.mockResults();
    this.createWrapper();
    console.log(this.accessor.getRawBuckets());
    console.log(this.wrapper.render().html());
  });
});
