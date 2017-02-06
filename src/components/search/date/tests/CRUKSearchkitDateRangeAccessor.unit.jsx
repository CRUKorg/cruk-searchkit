import {
  ImmutableQuery,
  BoolMust, BoolShould, RangeQuery,
  CardinalityMetric, FilterBucket
} from "searchkit";
import { CRUKSearchkitDateRangeAccessor } from '../CRUKSearchkitDateRangeAccessor.jsx';

function toPlainObject(ob) {
  return JSON.parse(JSON.stringify(ob));
}

describe('CRUKSearchkitDateRangeAccessor tests', () => {

  beforeEach(function() {

    this.options = {
      id: 'date-filter',
      field: 'date',
      title:'Date filter',
      startDate: '2016-08-12',
      endDate: '2016-08-15',
      updateParentState: () => null
    };

    this.accessor = new CRUKSearchkitDateRangeAccessor('date-filter', this.options);

  });

  it('buildSharedQuery', function() {
    let query = new ImmutableQuery();
    query = this.accessor.buildSharedQuery(query);
    let filters = query.getFilters();
    expect(toPlainObject(filters)).toEqual({});
    
    this.accessor.state = this.accessor.state.setValue({
      min: '2016-08-12',
      max: '2016-08-15'
    });

    query = new ImmutableQuery();
    query = this.accessor.buildSharedQuery(query);
    filters = query.getFilters();

    expect(toPlainObject(filters)).toEqual({
      range: {
        date: {
          format: 'yyyy-MM-dd',
          gte: '2016-08-12',
          lt: '2016-08-16'
        }
      }
    });
  });

  it('buildOwnQuery', function() {
    let query = new ImmutableQuery();
    this.accessor.state = this.accessor.state.setValue({
      min: '2016-08-12',
      max: '2016-08-15'
    });
    query = this.accessor.buildOwnQuery(query);
    
    // Comparisoon data.
    const filters = BoolMust([
      RangeQuery(this.accessor.options.field,{
        gte: '2016-08-12',
        lt: this.accessor.addOneDay('2016-08-15'),
        format: 'yyyy-MM-dd'
      })
    ]);
    const metric = CardinalityMetric(this.accessor.key, this.accessor.options.field);

    expect(toPlainObject(query.query.aggs)).toEqual(
      FilterBucket(this.accessor.key, filters, metric)
    );
  });
});
