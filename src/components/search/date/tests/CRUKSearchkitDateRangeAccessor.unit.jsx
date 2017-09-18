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

    this.multipleDayOptions = {
      id: 'date-filter',
      startDateField: 'date_start',
      endDateField: 'date_end',
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
          lte: '2016-08-15'
        }
      }
    });
  });

  it('buildSharedQuery with specified start & end date', function() {
    this.accessor = new CRUKSearchkitDateRangeAccessor('date-filter', this.multipleDayOptions);

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
      bool: {
        should: [{
          range: {
            date_start: {
              gte: '2016-08-12',
              lte: '2016-08-15',
              format: 'yyyy-MM-dd'
            }
          }
        }, {
          range: {
            date_end: {
              gte: '2016-08-12',
              lte: '2016-08-15',
              format: 'yyyy-MM-dd'
            }
          }
        }, {
          bool: {
            must: [{
              range: {
                date_start: {
                  lt: '2016-08-12',
                  format: 'yyyy-MM-dd'
                }
              }
            }, {
              range: {
                date_end: {
                  gt: '2016-08-15',
                  format: 'yyyy-MM-dd'
                }
              }
            }]
          }
        }, {
          bool: {
            must_not: [{
              exists: {
                field: 'date_start'
              }
            }, {
              exists: {
                field: 'date_end'
              }
            }]
          }
        }, {
          bool: {
            must: [{
              range: {
                date_start: {
                  lt: '2016-08-12',
                  format: 'yyyy-MM-dd'
                }
              }
            }, {
              bool: {
                must_not: {
                  exists: {
                    field: 'date_end'
                  }
                }
              }
            }]
          }
        }]
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
    
    // Comparison data.
    const filters = BoolMust([
      RangeQuery(this.accessor.options.field,{
        gte: '2016-08-12',
        lte: '2016-08-15',
        format: 'yyyy-MM-dd'
      })
    ]);
    const metric = CardinalityMetric(this.accessor.key, this.accessor.options.field);

    expect(toPlainObject(query.query.aggs)).toEqual(
      FilterBucket(this.accessor.key, filters, metric)
    );
  });

  it('buildOwnQuery with specified start & end date', function() {
    this.accessor = new CRUKSearchkitDateRangeAccessor('date-filter', this.multipleDayOptions);

    let query = new ImmutableQuery();
    this.accessor.state = this.accessor.state.setValue({
      min: '2016-08-12',
      max: '2016-08-15'
    });
    query = this.accessor.buildOwnQuery(query);

    // Comparison data.
    const filters = BoolMust([
      RangeQuery(this.accessor.options.startDateField, {
        gte: '2016-08-12',
        lte: '2016-08-15',
        format: 'yyyy-MM-dd'
      })
    ]);
    const metric = CardinalityMetric(this.accessor.key, this.accessor.options.startDateField);

    expect(toPlainObject(query.query.aggs)).toEqual(
      FilterBucket(this.accessor.key, filters, metric)
    );
  });
});
