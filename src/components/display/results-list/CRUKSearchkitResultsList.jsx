import React from 'react';

import {
  Hits,
  renderComponent
} from 'searchkit';

/**
 * Import our custom highlight accessor which won't mulch the array of objects.
 */
import CRUKSearchkitResultsHighlightAccessor from './CRUKSearchkitResultsHighlightAccessor.jsx'
import CRUKSearchkitResultsAccessor from './CRUKSearchkitResultsAccessor.jsx'
/**
 * And the rest.
 */
import CRUKSearchkitResultsListDisplay from './CRUKSearchkitResultsListDisplay.jsx';
import CRUKSearchkitResult from './../result/CRUKSearchkitResult.jsx';

/**
 * Define our class.
 */
export default class CRUKSearchkitResultsList extends Hits {

  constructor(props) {
    super();
  }

  static propTypes = {
    CRUKHighlightFields: React.PropTypes.arrayOf(
      React.PropTypes.oneOfType(
        [React.PropTypes.string, React.PropTypes.object]
      )
    )
  }

  static defaultProps = {
    mod: 'search-results',
    hitsPerPage: 10,
    itemComponent: CRUKSearchkitResult,
    listComponent: CRUKSearchkitResultsListDisplay,
    scrollTo: true
  }

  componentWillMount() {
    /**
     * Don't use super() here to avoid adding in both hits accessor and our
     * custom one.
     */
    this.searchkit = this._getSearchkit();

    if (this.searchkit) {
      this.accessor = this.defineAccessor();
      if (this.accessor) {
        this.accessor = this.searchkit.addAccessor(this.accessor)
      }
      this.stateListenerUnsubscribe = this.searchkit.emitter.addListener(()=> {
        !this.unmounted && this.forceUpdate()
      });
    } else {
      console.warn('No searchkit found in props or context for ' + this.constructor['name']);
    }

    /**
     * Add in the custom highlighter accessor which lets us specify exact
     * settings per highlight field.
     */
    if (this.props.CRUKHighlightFields) {
      this.searchkit.addAccessor(new CRUKSearchkitResultsHighlightAccessor(this.props.CRUKHighlightFields));
    }

    this.hitsAccessor = new CRUKSearchkitResultsAccessor({ scrollTo: this.props.scrollTo });
    this.searchkit.addAccessor(this.hitsAccessor);
  }

  render() {
    let hits = this.getHits();
    let hasHits = hits.length > 0;

    if (!this.isInitialLoading() && hasHits) {
      const {listComponent, mod, className, itemComponent, additionalFields} = this.props;

      return renderComponent(listComponent, {
        hits, mod, className, itemComponent, additionalFields
      });
    }

    return null;
  }
}
