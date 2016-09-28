import React from 'react';
import sanitizeHtml from 'sanitize-html-react';
import {
  HitsStats
} from "searchkit";

const CRUKHitsStatsDisplay = (props:HitsStatsDisplayProps) => {
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
export default class CRUKSearchSummary extends HitsStats {
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
      container: (this.props.mod || 'search-summary')
    }
  }

  render() {
    const timeTaken = this.searchkit.getTime()
    const hitsCount = this.searchkit.getHitsCount()

    if (hitsCount < 1) {
      return null;
    }

    const props:HitsStatsDisplayProps = {
      bemBlocks: this.bemBlocks,
      translate: this.translate,
      timeTaken: timeTaken,
      hitsCount: hitsCount,
      resultsFoundLabel: this.translate("hitstats.results_found", {
        timeTaken: timeTaken,
        hitCount: hitsCount,
        searchTerms: this.getQuery().index.queryString,
        resultsWord: hitsCount === 1 ? 'result' : 'results'
      })
    }
    return React.createElement(CRUKHitsStatsDisplay, props)
  }
}
