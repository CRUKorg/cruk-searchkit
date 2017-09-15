import {
  FilterBasedAccessor,
  ObjectState,
  RangeQuery,
  BoolShould,
  BoolMust,
  BoolMustNot,
  CardinalityMetric,
  FilterBucket
} from 'searchkit';
import moment from 'moment';

export class CRUKSearchkitDateRangeAccessor extends FilterBasedAccessor {

  constructor(key, options){
    super(key, options.id);
    this.options = options;

    this.state = new ObjectState({});
  }

  addOneDay(date) {
    return moment(date).add(1, 'day').format('YYYY-MM-DD');
  }

  buildSharedQuery(query) {
    if (this.state.hasValue()) {
      let val = this.state.getValue();
      this.options.updateParentState(val.min, val.max);

      // Default to using `field` prop.
      let rangeFilter = RangeQuery(this.options.field, {
        gte: val.min,
        lt: this.addOneDay(val.max),
        format: 'yyyy-MM-dd'
      });

      if (this.options.startDateField && this.options.endDateField) {
        // If both `startDateField` & `endDateField` have been defined, use these to set
        // upper & lower bounds on date range, ignore `field` prop.
        rangeFilter = BoolShould([
          // Find all events for which one of these criteria is true:
          // 1) The event start date is after the input start date but before/on the input end date.

          RangeQuery(this.options.startDateField, {
            gte: val.min,
            lte: val.max,
            format: 'yyyy-MM-dd'
          }),
          // OR
          // 2) The event end date is before the input end date but after the input start date.
          RangeQuery(this.options.endDateField, {
            gte: val.min,
            lte: val.max,
            format: 'yyyy-MM-dd'
          }),
          // OR
          // 3) The event start date is before the input start date and the event end date is after the input end date.
          BoolMust([
            RangeQuery(this.options.startDateField, {
              lt: val.min,
              format: 'yyyy-MM-dd'
            }),
            RangeQuery(this.options.endDateField, {
              gt: val.max,
              format: 'yyyy-MM-dd'
            })
          ]),
          // OR
          // 4) The event has no start or end date.
          BoolMustNot([
            {
              exists: {
                field: this.options.startDateField
              }
            },
            {
              exists: {
                field: this.options.endDateField
              }
            }
          ]),
          // OR
          // 5) The event has a start date but no end date.
          BoolMust([
            RangeQuery(this.options.startDateField, {
              lt: val.min,
              format: 'yyyy-MM-dd'
            }),
            BoolMustNot({
              exists: {
                field: this.options.endDateField
              }
            })
          ]),
        ])
      }


      let selectedFilter = {
        name:this.translate(this.options.title),
        value:`${val.min} - ${val.max}`,
        id:this.options.id,
        remove:()=> {
          this.state = this.state.clear()
        }
      };

      return query
        .addFilter(this.key, rangeFilter)
        .addSelectedFilter(selectedFilter);
    }
    this.options.updateParentState(null, null);

    return query;
  }

  getBuckets(){
    return this.getAggregations(
      [this.key, this.key, 'buckets'], []
    );
  }

  buildOwnQuery(query) {
    const val = this.state.getValue();
    const min = val.min;
    const max = val.max;
    let field = this.options.field;

    if (this.options.startDateField && this.options.endDateField) {
      field = this.options.startDateField;
    }

    let otherFilters = query.getFiltersWithoutKeys(this.key);
    let filters = BoolMust([
      otherFilters,
      RangeQuery(field, {
        gte: min,
        lt: this.addOneDay(val.max),
        format: 'yyyy-MM-dd'
      })
    ]);

    const metric = CardinalityMetric(this.key, field);

    return query.setAggs(FilterBucket(
      this.key,
      filters,
      metric
    ));
  }
}
