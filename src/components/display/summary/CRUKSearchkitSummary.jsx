import React from 'react';
import sanitizeHtml from 'sanitize-html-react';
import numeral from 'numeral';
import {
  HitsStats
} from 'searchkit';

const CRUKSearchkitSummaryDisplay = (props:CRUKSearchkitSummaryDisplayProps) => {
  const {resultsFoundLabel, bemBlocks} = props

  /**
   * As we're going to straight output the string as HTML, sanitise it first
   * but allowing
   */
  let sanitisedResultsFoundLabel = {
    __html: sanitizeHtml(resultsFoundLabel, {
      allowedTags: ['strong'],
      allowedAttributes: []
    })
  }

  return (
    <div className={bemBlocks.container()} data-qa="hits-stats">
      <div className={bemBlocks.container("info")} data-qa="info" dangerouslySetInnerHTML={sanitisedResultsFoundLabel}/>
    </div>
  )
}

/**
 * Extend the hitstats component so we can set the default string in a smarter
 * way formatting for singular/plural results. We also grab the search query.
 */
export default class CRUKSearchkitSummary extends HitsStats {
  constructor(props) {
    super(props);

    /**
     * Change the default string to be what we want.
     */
    this.translations = {
      'hitstats.results_found': '{hitCount} search {resultsWord} for <strong>{searchTerms}</strong>'
    }
  }

  /**
   * Change the default BEM classes.
   */
  defineBEMBlocks() {
    return {
      container: (this.props.mod || 'cr-search-summary')
    }
  }

  render() {
    const timeTaken = this.searchkit.getTime();
    const hitsCount = numeral(this.searchkit.getHitsCount()).format('0,0');

    if (hitsCount < 1) {
      return null;
    }

    const props:CRUKSearchkitSummaryDisplayProps = {
      bemBlocks: this.bemBlocks,
      translate: this.translate,
      timeTaken: timeTaken,
      hitsCount: hitsCount,
      resultsFoundLabel: this.translate('hitstats.results_found', {
        timeTaken: timeTaken,
        hitCount: hitsCount,
        searchTerms: this.getQuery().index.queryString,
        resultsWord: hitsCount === 1 ? 'result' : 'results'
      })
    };
    // If search is blocked, on empty search preformed do not render component.
    if (this.props.blockSearch) return null;
    
    return React.createElement(CRUKSearchkitSummaryDisplay, props)
  }
}
