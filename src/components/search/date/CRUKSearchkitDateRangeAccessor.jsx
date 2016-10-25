import {
  FilterBasedAccessor,
  ObjectState,
  RangeQuery,
  BoolMust,
  CardinalityMetric,
  FilterBucket
} from "searchkit"

const isUndefined = require("lodash/isUndefined")

export class CRUKSearchkitDateRangeAccessor extends FilterBasedAccessor {

  constructor(key, options){
    super(key, options.id)
    this.options = options

    this.state = new ObjectState({})
  }

  buildSharedQuery(query) {
    if (this.state.hasValue()) {
      let val = this.state.getValue()
      let rangeFilter = RangeQuery(this.options.field,{
        lte:val.max,
        gte:val.min,
        format: "yyyy-MM-dd"
      })

      let selectedFilter = {
        name:this.translate(this.options.title),
        value:`${val.min} - ${val.max}`,
        id:this.options.id,
        remove:()=> {
          this.state = this.state.clear()
        }
      }

      return query
        .addFilter(this.key, rangeFilter)
        .addSelectedFilter(selectedFilter)
    }

    return query
  }

  getBuckets(){
    return this.getAggregations(
      [this.key, this.key, "buckets"], []
    )
  }

  buildOwnQuery(query) {
    const val = this.state.getValue()
    const min = val.min
    const max = val.max

    let otherFilters = query.getFiltersWithoutKeys(this.key)
    let filters = BoolMust([
      otherFilters,
      RangeQuery(this.options.field,{
        gte:min,
        lte:max,
        format: "yyyy-MM-dd"
      })
    ])

    const metric = CardinalityMetric(this.key, this.options.field)

    return query.setAggs(FilterBucket(
      this.key,
      filters,
      metric
    ))
  }
}