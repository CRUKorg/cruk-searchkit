import { 
  FilterBasedAccessor, 
  ObjectState, 
  FilteredQuery, 
  BoolMust, 
  CardinalityMetric, 
  FilterBucket 
} from "searchkit"

const isUndefined = require("lodash/isUndefined")

export class CRUKGeoSuggestAccessor extends FilterBasedAccessor {

  constructor(key, options){
    super(key, options.id)
    this.options = options
    
    this.state = new ObjectState({})
  }

  buildSharedQuery(query) {
    const val = this.state.getValue()
    if(Object.keys(val).length > 0){
      let filter = {
        geo_distance: {
          distance: this.options.resultRadius || "5km",
          location: {}
        }
      }
      filter.geo_distance[this.options.field].lat = val.lat
      filter.geo_distance[this.options.field].lon = val.lng
      let geoFilter = FilteredQuery({
        filter: filter
      })

      query = query.addFilter(this.key, geoFilter)
    }

    return query
  }

  getDocCount(){
    return this.getAggregations([this.key, "doc_count"], 0)
  }

  buildOwnQuery(query) {
    let filters = query.getFilters()
    if (!this.state.getValue()){
      if (filters) filters = BoolMust([filters, this.filter])
      else filters = this.filter
    }
    return query
      .setAggs(FilterBucket(
        this.key,
        filters
      ))
  }
}