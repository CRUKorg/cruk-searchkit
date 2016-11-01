import React from 'react';
import {
  SearchkitComponent
} from "searchkit";
import gtmParts from 'react-google-tag-manager';
import {
  defaults
} from 'lodash';

/**
 * Create our Google Tag Manager component. Follows the basic example found
 * here:
 * https://github.com/holidaycheck/react-google-tag-manager
 *
 * Adding a listener to the new results events is from:
 * http://docs.searchkit.co/stable/docs/core/SearchkitManager.html
 */
class CRUKSearchkitGTM extends SearchkitComponent {
  constructor(props) {
    super(props);
    this.previousState = {};
  }

  /**
   * Tack on our script if needed.
   */
  componentDidMount() {
    const dataLayerName = this.props.dataLayerName || 'dataLayer';
    const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';

    if (!window[dataLayerName]) {
      const gtmScriptNode = document.getElementById(scriptId);

      eval(gtmScriptNode.textContent);
    }

    /**
     * Setup our listener for new events.
     */
    let resultsListener = this.searchkit.addResultsListener((results)=>{
      this.trackResultsChange(results)
    })
  }

  /**
   * Return the values of whether or not the search has been filtered, sorted,
   * searched geographically and also provide the chance to send on extra data.
   *
   * Also means you can override the "query" if your search isn't a fulltext
   * one.
   *
   * Should return an object with values, or an empty object.
   */
  derivePayloadValues(results) {
    const searchState = this.searchkit.state;

    return {};
  }

  /**
   * Track the result change sending data to GA/GTM.
   */
  trackResultsChange(results) {
    /**
     * Construct the payload.
     */
    let gtmSearchTitle = 'React news proto search';
    let query = this.searchkit.state.q;
    let page = typeof this.searchkit.state.p == 'undefined' ? 1 : this.searchkit.state.p;
    let totalResults = this.getHitsCount();

    /**
     * Figure out paging and filtering events.
     */
    let previousPage = typeof this.previousState.p == 'undefined' ? 1 : this.previousState.p;
    let pagingEvent = page != previousPage && query == this.previousState.q;

    var pushObject = {
      'event': 'site search event',
      'content-name': '/search?query=' + query + '&cat=' + gtmSearchTitle + '&page=' + page,
      'keyword': query,
      'target': gtmSearchTitle,
      'value': totalResults,
      'searchFiltered': 'false',
      'searchSorted': 'false',
      'searchPaged': pagingEvent ? 'true' : 'false',
      'searchNoResults': totalResults < 1 ? 'true' : 'false',
      'searchGeo': 'false',
      'pageNumber': page
    };

    /**
     * Allow the object to be changed.
     */
    const derivedValues = this.derivePayloadValues(results);
    const payload = defaults(derivedValues, pushObject);

    /**
     * Push the event to dataLayer.
     */
    dataLayer.push(payload);

    /**
     * Save state for later, this needs redux :C
     */
    this.previousState = this.searchkit.state;
  }

  render() {
    const gtm = gtmParts({
      id: this.props.gtmId,
      dataLayerName: this.props.dataLayerName || 'dataLayer',
      additionalEvents: this.props.additionalEvents || {}
    });

    return (
      <div>
        <div>{gtm.noScriptAsReact()}</div>
        <div id={this.props.scriptId || 'react-google-tag-manager-gtm'}>
          {gtm.scriptAsReact()}
        </div>
      </div>
    );
  }
}

CRUKSearchkitGTM.propTypes = {
  gtmId: React.PropTypes.string.isRequired,
  dataLayerName: React.PropTypes.string,
  additionalEvents: React.PropTypes.object,
  scriptId: React.PropTypes.string
};

export default CRUKSearchkitGTM;
