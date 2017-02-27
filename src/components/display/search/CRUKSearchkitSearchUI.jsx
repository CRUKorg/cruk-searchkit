import React from 'react';
import {
  SearchkitComponent,
  NoHits
} from 'searchkit';
import classNames from 'classnames';

/**
 * Import custom components.
 */
import CRUKSearchkitLoading from './../loading/CRUKSearchkitLoading';
import CRUKSearchkitSummary from './../summary/CRUKSearchkitSummary';
import CRUKSearchkitResultsList from './../results-list/CRUKSearchkitResultsList'
import CRUKSearchkitPagination from './../../search/pagination/CRUKSearchkitPagination';
import CRUKSearchkitNoResults from './../no-results/CRUKSearchkitNoResults'

/**
 * Aaand the search interface/ui.
 */
export default class CRUKSearchkitSearchUI extends SearchkitComponent {
  render() {
    let divClasses = classNames('col-xs-12', 'col-sm-10', 'col-md-8', 'col-sm-push-2', 'search-interface', {
      'search-interface--loading': this.isLoading()
    });

    const blockSearch = this.props.blockSearch && this.searchkit.state && Object.keys(this.searchkit.state).length === 0;

    return <div className="row">
        <div id="search-interface" className={divClasses}>
          <div className="search-interface__blocking-layer"></div>

          <CRUKSearchkitLoading />

          <CRUKSearchkitSummary blockSearch={blockSearch} />

          <CRUKSearchkitResultsList
            sourceFilter={['title', 'url']}
            blockSearch={blockSearch}
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
            ]}
          />

          <CRUKSearchkitNoResults
            component={this.props.component}
            errorComponent={this.props.errorComponent}
            translations={{
              'NoHits.DidYouMean': 'Search for {suggestion}',
              'NoHits.SearchWithoutFilters': 'Search for {query} without filters'
            }}
            noResultsBody={this.props.noResultsBody}
            noResultsTitle={this.props.noResultsTitle}
            errorMessage={this.props.errorMessage}
            suggestionsField="suggest"
            mod="search-failed"
          />

          <CRUKSearchkitPagination blockSearch={blockSearch} />

        </div>
      </div>
  }
}
