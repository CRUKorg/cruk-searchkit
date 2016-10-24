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
import CRUKSearchNoResults from './../noresults/NoResults.jsx'

/**
 * Aaand the search interface/ui.
 */
export default class CRUKSearchkitSearchUI extends SearchkitComponent {
  render() {
    let divClasses = classNames('col-xs-12', 'col-sm-8', 'col-sm-push-2', 'search-interface', {
      'search-interface--loading': this.isLoading()
    });

    return <div className="row">
        <div id="search-interface" className={divClasses}>
          <div className="search-interface__blocking-layer"></div>

          <CRUKLoading/>

          <CRUKSearchSummary/>

          <CRUKSearchHits
            sourceFilter={['title', 'url']}
            itemComponent={this.props.itemComponent}
            listComponent={this.props.listComponent}
            additionalFields={this.props.additionalFields}
            CRUKHighlightFields={[
              {
                'field': 'description',
                'number_of_fragments': 0,
                'pre_tags': ['<strong>'],
                'post_tags': ['</strong>']
              }
            ]} />

          <CRUKSearchNoResults
            component={this.props.component}
            errorComponent={this.props.errorComponent}
            translations={{
              "NoHits.DidYouMean":"Search for {suggestion}",
              "NoHits.SearchWithoutFilters":"Search for {query} without filters"
            }}
            noResultsBody={this.props.noResultsBody}
            noResultsTitle={this.props.noResultsTitle}
            errorMessage={this.props.errorMessage}
            suggestionsField="suggest"
            mod="search-failed" />

          <CRUKPagination/>

        </div>
      </div>
  }
}
