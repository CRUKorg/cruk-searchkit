import React from 'react';
import {
  SearchkitComponent,
  NoHits
} from "searchkit";
import classNames from 'classnames';

/**
 * Import custom components.
 */
import CRUKLoading from './../loading/Loading.jsx';
import CRUKSearchSummary from './../summary/Summary.jsx';
import CRUKSearchHits from './../hits/Hits.jsx'
import CRUKPagination from './../pagination/Pagination.jsx';
import CRUKSearchNoResultsDisplay from './../noresults/NoResults.jsx'

/**
 * Aaand the search interface/ui.
 */
export default class CRUKSearch extends SearchkitComponent {
  render() {
    var divClasses = classNames('col-xs-12', 'col-sm-8', 'col-sm-push-2', 'search-interface', {
      'search-interface--loading': this.isLoading()
    });

    return <div className="row">
        <div id="search-interface" className={divClasses}>
          <div className="search-interface__blocking-layer"></div>

          <CRUKLoading/>

          <CRUKSearchSummary/>

          <CRUKSearchHits
            sourceFilter={['title', 'field_url:url', 'field_type', 'field_published']}
            CRUKHighlightFields={[
              {
                'field': 'body:value',
                'number_of_fragments': 0,
                'pre_tags': ['<strong>'],
                'post_tags': ['</strong>']
              }
            ]} />

          <NoHits
            component={CRUKSearchNoResultsDisplay}
            translations={{
              "NoHits.DidYouMean":"Search for {suggestion}",
              "NoHits.SearchWithoutFilters":"Search for {query} without filters"
            }}
            suggestionsField="body:value"
            mod="search-failed" />

          <CRUKPagination/>

        </div>
      </div>
  }
}
