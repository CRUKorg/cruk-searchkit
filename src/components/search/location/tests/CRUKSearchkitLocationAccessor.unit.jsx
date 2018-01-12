import {
  ImmutableQuery,
  BoolMust, BoolShould, ArrayState, TermQuery,
  CardinalityMetric, FilterBucket
} from "searchkit";
import { CRUKSearchkitLocationAccessor } from '../CRUKSearchkitLocationAccessor.jsx';

function toPlainObject(ob) {
  return JSON.parse(JSON.stringify(ob));
}

describe('CRUKSearchkitLocationAccessor tests', () => {

  beforeEach(function() {

    this.options = {
      id: "location-filter",
      field: 'location',
      title:"Loaction filter",
      resultRadius: "20km",
      updateParentState: () => null
    };

    this.accessor = new CRUKSearchkitLocationAccessor("location-filter", this.options);

  });

  it('buildSharedQuery', function() {
    let query = new ImmutableQuery();
    query = this.accessor.buildSharedQuery(query);
    let filters = query.getFilters();
    expect(toPlainObject(filters)).toEqual({});
    
    this.accessor.state = this.accessor.state.setValue({
      lat: '-12.122222222',
      lng: '15.555555'
    });

    query = new ImmutableQuery();
    query = this.accessor.buildSharedQuery(query);
    filters = query.query;
    expect(toPlainObject(filters)).toEqual({
      query: {
        bool: {
          filter: {
            geo_distance: {
              distance: '20km',
              location: {
                lat: -12.122222222,
                lon: 15.555555
              }
            }
          }
        }
      },
      size : 0
    });
  });

  it('buildOwnQuery', function() {
    let query = new ImmutableQuery();
    query = this.accessor.buildOwnQuery(query);
    expect(toPlainObject(query.query.aggs)).toEqual(
      FilterBucket('location-filter', {})
    );
  });
});
